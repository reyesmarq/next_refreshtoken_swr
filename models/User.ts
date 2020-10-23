import { createSchema, Type, typedModel } from 'ts-mongoose';
import { models } from 'mongoose';

let userschema = createSchema(
  {
    email: Type.string({ required: true, unique: true, index: true }),
    password: Type.string({ required: true }),
  },
  { timestamps: true }
);

let User = models.User || typedModel('User', userschema);

export { User };
