import UserModel from '../database/models/User.Model';
import JWT from '../auth/JWT';
import { ILogin } from '../interfaces/Login.interface';

const md5 = require('md5');

class LoginService {
  protected _jwt = new JWT();

  constructor(private _userInfo = UserModel) {}

  private async findUser(email: string) {
    const result = await this._userInfo.findOne({ where: { email } });
    return result;
  }

  async login({ email, password }: ILogin) {
    const userInfo = await this.findUser(email);

    if (!userInfo) return { type: 404, message: 'User not found' };
    
    const cryptPassword = md5(password);
    
    if (cryptPassword === userInfo.password) {
      const token = this._jwt.generateToken({ email, password: cryptPassword });
      return { type: 200, 
        message: {
          id: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          token,
        } };
    }

    
    return { type: 404, message: 'Incorrect password' };
  }


}

export default LoginService;