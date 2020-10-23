import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const login: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'GET') {
    res.status(200).json({
      email: 'email',
      password: 'password',
    });
  }
};

export default login;
