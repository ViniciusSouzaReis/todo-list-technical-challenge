import { RequestHandler } from 'express';
import RegisterService from '../service/RegisterService';

class RegisterController {
  constructor(private _serviceLogin = new RegisterService()) {}

  register: RequestHandler = async (req, res) => {
    const { name, email, password } = req.body;

    const { type, message } = await this._serviceLogin.createUser({ name, email, password });

    return res.status(type).json(message);
  };
}

export default RegisterController;