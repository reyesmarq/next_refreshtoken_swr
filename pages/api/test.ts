import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";


const test: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({
      msg: `Method ${req.method} Not allowed`,
    });
  } else {
    res.json({
      msg: 'hello'
    })
  }
};

export default test;
