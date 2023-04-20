import subProcess  from 'child_process';
import util from 'util';
import fs from 'fs';
import mongoose from 'mongoose';

import ModelFileModel from '../models/modelFile';
import { Design, Model,
  ModelFile, ModelFileStatus } from '../types';

interface RenderParameter{
  name: string,
  value: string
}

type RenderParameters = Array<RenderParameter>;

const execute = async (inputFilename: string, outputFilename: string,
  parameters: RenderParameters) => {
  // init
  const args: string[] = [];
  // output
  args.push('-o');
  args.push(`${outputFilename}`);
  // parameters
  for (const p of parameters){
    args.push('-D');
    args.push(`${p.name}=${p.value}`);
  }
  // input
  args.push(`${inputFilename}`);
  // exec
  try {
    await util.promisify(subProcess.execFile)('openscad', args);
    return true;
  } catch (e) {
    return false;
  }
};

const getRandomFilename = (): string => {
  return 'render' + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9);
};

const render = async (modelFile: ModelFile, 
  model: Model, design: Design): Promise<void> => {
  // vygeneruj filename pre input a output file
  const filename = getRandomFilename();
  const inputFilename = 'temp/' + filename + '.scad';
  const outputFilename = 'temp/' + filename + '.stl';
  // z design zapíš do input file
  fs.writeFileSync(inputFilename, design.code);
  // model parameter na pole parametrov
  const parameters: RenderParameters = model.parameterValues.map(p => {
    return {
      name: p.name,
      value: p.value
    };
  });
  // spusti execute
  const rendered = await execute(inputFilename, outputFilename, parameters);
  // zober output file a zapíš do modelfile databazy
  if (rendered){
    const outputFile = fs.readFileSync(outputFilename) as mongoose.Types.Buffer;
    modelFile.data = outputFile;
    modelFile.status = ModelFileStatus.OK;
  } else {
    modelFile.status = ModelFileStatus.FAILED;
  }
  await ModelFileModel.findByIdAndUpdate(
    modelFile._id, 
    modelFile,
    { new: true, runValudators: true });
  // zmaž input a output file
  fs.unlinkSync(inputFilename);
  if (rendered){
    fs.unlinkSync(outputFilename);
  }
};

export default {
  render
};
