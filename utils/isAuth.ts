// * This is a middleware that is being implemented in /api

import { verify } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

interface NextApiRequestWithPayload extends NextApiRequest {
  payload: { userId: string };
}

const isAuth = (next) => (
  req: NextApiRequestWithPayload,
  res: NextApiResponse
) => {
  let authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(403).json({ msg: 'not authorize' });
  }

  try {
    let token = authorization.split(' ')[1];
    let payload = verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.payload = <{ userId: string }>payload;
  } catch (e) {
    throw new Error('Not authenticated');
  }

  return next(req, res);
};

export { isAuth };

