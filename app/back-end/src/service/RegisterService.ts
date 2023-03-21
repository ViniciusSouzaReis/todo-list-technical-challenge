import UserModel from '../database/models/User.Model';
import { IRegister } from '../interfaces/Register.interface';

const md5 = require('md5');

class RegisterService {
  constructor(private _userInfo = UserModel) {}

  private async findUser (email : string) {
    const result = await this._userInfo.findOne({ where: { email } });
    return result;
  }

  async createUser({ name ,email, password }: IRegister) {
    const userInfo = await this.findUser(email);

    if (userInfo) return { type: 409, message: { message: 'User already exists' } };

    const cryptPassword = md5(password);

    const newUser = {
      name,
      email,
      password: cryptPassword, 
    };

    await this._userInfo.create(newUser)

    return { type: 201, message: 'User created!' };
  }

}

export default RegisterService;