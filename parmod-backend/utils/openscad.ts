import subProcess  from 'child_process';
import path from 'path';
import fs from 'fs';

const render = () => {
  const command = 'openscad -o output.stl -D a=100 -D b=200 input.scad';
  subProcess.exec(command);
};
render();

export default {
  render
};
