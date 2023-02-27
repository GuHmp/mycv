import {
  NotFoundException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    // Ver se email está sendo usado
    const users = await this.usersService.find(email);
    if (users.length) {
      throw new BadRequestException('email in use');
    }

    //Hash do password
    //Gerar o Salt
    const salt = randomBytes(8).toString('hex');
    //Passa o password e o salt pelo Hash
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    //Juntar o hash e o salt
    const result = salt + '.' + hash.toString('hex');
    //Cria novo usuário
    const user = await this.usersService.create(email, result);
    //return no User
    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('bad password');
    }

    return user;
  }
}
