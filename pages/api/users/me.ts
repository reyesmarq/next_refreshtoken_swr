import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { UserModel } from '../../../models/User';
import { dbConnect } from '../../../utils/dbConnection';
import { isAuth } from '../../../utils/isAuth';

interface NextApiRequestWithPayload extends NextApiRequest {
  payload: {
    userId: string
  }
}

const me: NextApiHandler = async (
  req: NextApiRequestWithPayload,
  res: NextApiResponse
) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({
      msg: `Method ${req.method} Not allowed`,
    });
  } else {
    try {
      await dbConnect();
      console.log('me')
      console.log(req.payload)

      let user = await UserModel.findById(req.payload.userId)

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        error: 'Internal server error' + error.message,
      });
    }
  }
};

// export default withMiddlewares(isAuth(me));
export default isAuth(me)