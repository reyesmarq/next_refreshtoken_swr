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

  console.log(authorization);

  console.log('getting here 1');
  if (!authorization) {
    return res.status(403).json({ msg: 'not authorize' });
  }

  try {
    let token = authorization.split(' ')[1];
    console.log(token);
    let payload = verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(payload);
    req.payload = <{ userId: string }>payload;
  } catch (e) {
    console.log('Error', e);
    throw new Error('Not authenticated');
  }

  return next(req, res);
};

export { isAuth };
