import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { User } from '../../../models/User';
import { dbConnect } from '../../../utils/dbConnection';

const index: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  // if (req.method !== 'POST') {
  //   res.setHeader('Allow', ['POST']);
  //   res.status(405).json({
  //     msg: `Method ${req.method} Not allowed`,
  //   });
  // } else {}
  try {
    await dbConnect();

    let users = await User.find();

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      error: 'Internal server error' + error.message,
    });
  }
};

export default index;
