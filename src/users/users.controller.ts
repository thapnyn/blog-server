import { Body, Controller, Delete, Get, Headers, Param, Post, HttpException, HttpStatus, } from '@nestjs/common';
import { UsersService } from './users.service';

export class UserController {
  constructor(private readonly usersService: UsersService) {}
}