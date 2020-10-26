import { compare } from 'bcryptjs';
import cookie from 'cookie';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { User, UserModel } from '../../../models/User';
import { dbConnect } from '../../../utils/dbConnection';
import { createAccessToken, createRefreshToken } from '../../../utils/token';
import { withMiddlewares } from '../../../utils/withMiddleware';

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
      let user: User = await UserModel.findOne({ email });

      if (!user) {
        return res.status(403).json({
          success: false,
          error: 'Invalid Credentials',
        });
      }

      let validPassword = await compare(password, user.password);

      if (!validPassword) {
        return res.status(403).json({
          success: false,
          error: 'Invalid Credentials',
        });
      }

      // Setting the cookie
      res.setHeader(
        'Cookie',
        cookie.serialize('jid', createRefreshToken(user), {
          httpOnly: true,
        })
      );
      // Login successfully
      return res
        .status(201)
        .json({ success: true, data: createAccessToken(user) });
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        error: 'Internal server error' + error.message,
      });
    }
  }
};

export default withMiddlewares(login);
