import Cookie from 'cookie';
import { sign } from 'jsonwebtoken';
import { NextApiResponse } from 'next';
import { User } from '../models/User';

const createAccessToken = (user: User) => {
  // TODO: refactor and remove ts-ignore
  // * this can be acomplished by refactoring the model. User us not currently contains id on it
  // @ts-ignore
  return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  });
};

const createRefreshToken = (user: User) => {
  // TODO: refactor and remove ts-ignore
  // * this can be acomplished by refactoring the model. User us not currently contains id on it
  return sign(
    // @ts-ignore
    { userId: user.id, tokenVersion: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: '7d',
    }
  );
};

const sendRefreshToken = (res: NextApiResponse, token: string) => {
  res.setHeader(
    'Cookie',
    Cookie.serialize('jid', token, {
      httpOnly: true,
    })
  );
};

export { createAccessToken, createRefreshToken, sendRefreshToken };

