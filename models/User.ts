// https://hackernoon.com/how-to-link-mongoose-and-typescript-for-a-single-source-of-truth-94o3uqc?source=rss
import { Document, model, Schema } from 'mongoose';

interface IUser {
  email: string;
  password: string;
}

interface UserModel extends IUser, Document {}

let userSchema = new Schema<IUser>({
  email: { type: String, required: true, index: true },
  password: { type: String, required: true },
});

let User = model<UserModel>('User', userSchema);

export { User };

