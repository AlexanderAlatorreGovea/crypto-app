import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from './user.repository';
import { hash } from 'bcrypt';
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
}
