import Cookie from 'cookie';
import { verify } from 'jsonwebtoken';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { UserModel } from '../../../models/User';
import { dbConnect } from '../../../utils/dbConnection';
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken
} from '../../../utils/token';
import { withMiddlewares } from '../../../utils/withMiddleware';

const refreshToken: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({
      msg: `Method ${req.method} Not allowed`,
    });
  } else {
    let payload = null;
    try {
      await dbConnect();
      let cookies = Cookie.parse(req.headers.cookie);
      let token = cookies.jid;

      if (!token) {
        return res.status(500).json({
          ok: false,
          accessToken: '',
        });
      }

      payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
      console.log('Error in the server');
      return res.status(200).json({
        ok: false,
        accessToken: '',
      });
    }

    // token is valid and we can send back an accessToken
    const user = await UserModel.findById(payload.userId);

    if (!user) {
      console.log(`Weren't able to find the user`);
      return res.status(400).json({
        ok: false,
        accessToken: '',
      });
    }

    // IF user token version is not equals to what we have on the payload
    // Token is not valid
    if (user.tokenVersion !== payload.tokenVersion) {
      return res.status(500).json({ ok: false, accessToken: '' });
    }

    // if the refresh is ok, refresh the refresh token
    sendRefreshToken(res, createRefreshToken(user));

    console.log(`Generate the refresh token`);
    res.status(200).json({
      ok: true,
      accessToken: createAccessToken(user),
    });
  }
};

export default withMiddlewares(refreshToken);
