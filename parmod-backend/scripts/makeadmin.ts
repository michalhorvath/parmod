import userModel from '../models/user';
import { UserRole } from '../types';

import db from '../utils/db';
db.connect();

const makeadmin = async (username: string): Promise<void> => {
  try {
    const user = await userModel.findOneAndUpdate({username}, {role: UserRole.ADMIN});
    if (user) {
      console.log(`User ${username} promoted to admin role.`);
    }
  } catch (e){
    console.log(e);
  }
};

if (process.argv.length !== 3) {
  console.log('Please specify only name of the user to be promoted to admin role.');
}

const username = process.argv[2];

// eslint-disable-next-line
makeadmin(username);
