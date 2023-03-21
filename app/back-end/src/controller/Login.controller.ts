import { RequestHandler } from 'express';
import LoginService from '../service/LoginService';

class LoginController {
  constructor(private _serviceLogin = new LoginService()) {}

  login: RequestHandler = async (req, res) => {
    const { email, password } = req.body;

    const { type, message} = await this._serviceLogin.login({ email, password });

    return res.status(type).json(message);
  };
}

export default LoginController;