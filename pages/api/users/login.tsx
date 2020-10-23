import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '../../utils/dbConnection';

const login: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    res.status(200).json({
      email: 'email',
      password: 'password',
    });
  }
};

export default login;
