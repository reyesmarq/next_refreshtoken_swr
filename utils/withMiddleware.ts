import cors from 'cors';
import morgan from 'morgan';
import { NextApiRequest, NextApiResponse } from 'next';

// * Source from this function
// * https://github.com/vercel/next.js/discussions/14415
const withMiddlewares = (next) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    // creates a list of middlewares (not required, but also filters any conditional
    // middlewares based upon current ENV)
    const middlewares = [
      process.env.NODE_ENV === 'development' && morgan('tiny'),
      // * This is not needed since, I'm doing the request from the same origin
      cors({ origin: 'http://localhost:3000', credentials: true }),
    ].filter(Boolean);

    // each middleware will then be wrapped within its own promise
    const promises = middlewares.reduce((acc, middleware) => {
      const promise = new Promise((resolve, reject) => {
        middleware(req, res, (result) =>
          result instanceof Error ? reject(result) : resolve(result)
        );
      });
      return [...acc, promise];
    }, []);

    // promised middlewares get asynchronously resolved (this may need to be switched to a synchronous
    // loop if a certain middleware function needs to be resolved before another)
    await Promise.all(promises);

    // returns the next wrapped function(s) to be executed (can be an API route or another additional middleware)
    return next(req, res);
  } catch (error) {
    // if any middleware fails, throws a 400 error
    return res.status(400).send(error);
  }
};

export { withMiddlewares };

