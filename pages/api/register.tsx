import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '../../utils/dbConnection';
import { User } from '../../models/User';

interface NextApiRequestWithRegister extends NextApiRequest {
  body: {
    email: string;
    password: string;
  };
}

const register: NextApiHandler = async (
  req: NextApiRequestWithRegister,
  res: NextApiResponse
) => {
  let db = await dbConnect();

  // Creating the user
  try {
    let user = await new User({
      email: 'reyes.marq@gmail.com',
      password: 'testing',
    }).save();

    console.log(user);

    return res.status(201).json({ success: true, data: user });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      error: 'Internal server error' + error.message,
    });
  }

  res.status(200).json({ msg: 'ok' });
};

export default register;
