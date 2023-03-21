import { RequestHandler } from 'express';

class TokenController {
  checkToken: RequestHandler = async (req, res) => {
    return res.status(200).end();
  };
}

export default TokenController;