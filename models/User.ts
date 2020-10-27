// https://hackernoon.com/how-to-link-mongoose-and-typescript-for-a-single-source-of-truth-94o3uqc?source=rss
// import { Document, model, models, Schema } from 'mongoose';

// interface IUser {
//   email: string;
//   password: string;
// }

// interface UserModel extends IUser, Document {}

// let userSchema = new Schema<IUser>({
//   email: { type: String, required: true, index: true },
//   password: { type: String, required: true },
// });

// let User = models.User || model<UserModel>('User', userSchema);

// export { User };

import { Document, model, models, Schema, SchemaTypeOpts } from 'mongoose';

export interface User {
  email: string;
  password: string;
  tokenVersion: number;
}

interface UserModel extends User, Document {}

let userDefinition: Record<keyof User, any> = {
  email: <SchemaTypeOpts<any>>{
    type: String,
    required: true,
    unique: true,
  },
  password: <SchemaTypeOpts<any>>{
    type: String,
    required: true,
    // select: false // this is to avoid returning while query the model
  },
  tokenVersion: <SchemaTypeOpts<any>>{
    type: Number,
    required: true,
    default: 0,
  },
};

let userSchema: Schema<User> = new Schema(userDefinition);

let UserModel = models.User || model<UserModel>('User', userSchema);

export { UserModel };

