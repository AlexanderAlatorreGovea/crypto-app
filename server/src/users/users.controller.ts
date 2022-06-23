import { Body, Controller, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserRequest } from './dto/create-user-request';

@Controller('users')
export class UsersController {}
