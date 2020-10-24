import { compare, hash } from 'bcryptjs';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { IUser, User } from '../../../models/User';
import { dbConnect } from '../../../utils/dbConnection';

interface NextApiRequestWithRegister extends NextApiRequest {
  body: {
    email: string;
    password: string;
  };
}

const login: NextApiHandler = async (
  req: NextApiRequestWithRegister,
  res: NextApiResponse
  // TODO: refactor the return type and standarize a response.
) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({
      msg: `Method ${req.method} Not allowed`,
    });
  } else {
    try {
      await dbConnect();
      let { email, password } = req.body;

      // validate if there is an existing user with that email
      let user: IUser = await User.findOne({ email });

      if (!user) {
        return res.status(403).json({
          success: false,
          error: 'Invalid Credentials',
        });
      }

      let validPassword = compare(password, user.password);

      let hashPassword = await hash(password, 10);
      

      return res.status(201).json({ success: true, data: user });
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        error: 'Internal server error' + error.message,
      });
    }
  }
};

export default login;
