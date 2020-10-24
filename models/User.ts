import { models } from 'mongoose';
import { createSchema, Type, typedModel } from 'ts-mongoose';

export interface IUser {
  email: string;
  password: string;
}

let userschema = createSchema(
  {
    email: Type.string({ required: true, unique: true, index: true }),
    password: Type.string({ required: true }),
  },
  { timestamps: true }
);

let User = models.User || typedModel('User', userschema);

export { User };

