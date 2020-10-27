import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { UserModel } from '../../../models/User';
import { dbConnect } from '../../../utils/dbConnection';

interface NextApiRequestWithUserId extends NextApiRequest {
  body: {
    userId: string;
  };
}

const revokeRefreshTokenForUser: NextApiHandler = async (
  req: NextApiRequestWithUserId,
  res: NextApiResponse
) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({
      msg: `Method ${req.method} Not allowed`,
    });
  } else {
    await dbConnect();

    // let user = await UserModel.findById(req.body.userId);
    let user = await UserModel.findByIdAndUpdate(req.body.userId, {
      $inc: {
        tokenVersion: 1,
      },
    });

    console.log('user', user);
    res.json({
      ok: true,
    });
  }
};

export default revokeRefreshTokenForUser;
