import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from './user.repository';
import { hash, compare } from 'bcrypt';
import { CreateUserRequest } from './dto/request/create-user-request';
import { UserResponse } from './dto/response/user-response.dto';
import { User } from './models/User';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(
    createUserRequest: CreateUserRequest,
  ): Promise<UserResponse> {
    await this.validateCreateUserRequest(createUserRequest);

    const password = await hash(createUserRequest.password, 10);
    const user = await this.usersRepository.insertOne({
      ...createUserRequest,
      password,
    });

    return this.buildResponse(user);
  }

  private async validateCreateUserRequest(
    createUserRequest: CreateUserRequest,
  ) {
    const user = await this.usersRepository.findOneByEmail(
      createUserRequest.email,
    );

    if (user) {
      throw new BadRequestException('This user already exists.');
    }

    return user;
  }

  private buildResponse(user: User): UserResponse {
    return {
      _id: user._id.toHexString(),
      email: user.email,
    };
  }

  async validateUser(email: string, password: string): Promise<UserResponse> {
    const user = await this.usersRepository.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException(`User does not exist by email ${email}`);
    }

    const passwordIsValid = await compare(password, user.password);

    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are invalid');
    }

    return this.buildResponse(user);
  }
}
