import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '../common/current-user.decorator';
import { AuthGuard } from '../common/auth.guard';
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('admin/users')
@UseGuards(AuthGuard, RolesGuard)
@Roles('admin')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  list() {
    return this.usersService.list();
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getById(id);
  }

  @Post()
  create(@Body() body: CreateUserDto, @CurrentUser() user: { id: number }) {
    return this.usersService.create(body, user.id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
    @CurrentUser() user: { id: number },
  ) {
    return this.usersService.update(id, body, user.id);
  }

  @Patch(':id/password')
  updatePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdatePasswordDto,
    @CurrentUser() user: { id: number },
  ) {
    return this.usersService.updatePassword(id, body, user.id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: { id: number }) {
    return this.usersService.remove(id, user.id);
  }
}
