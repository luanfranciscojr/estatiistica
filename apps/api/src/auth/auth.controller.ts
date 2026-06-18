import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthenticatedRequest } from '../common/authenticated-request.interface';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDto, @Res({ passthrough: true }) response: Response) {
    return this.authService.login(body.login, body.senha, response);
  }

  @Post('logout')
  @HttpCode(204)
  async logout(
    @Req() request: AuthenticatedRequest,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.logout(request, response);
  }

  @Get('session')
  getSession(@Req() request: AuthenticatedRequest) {
    return this.authService.getSession(request);
  }
}
