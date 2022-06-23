import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user-request';

@Controller('users')
export class UsersController {
  @Post()
  async createUser(@Body() createUserRequest: CreateUserRequest): Promise<any> {
    return this.userService.createUser(createUserRequest);
  }
}
