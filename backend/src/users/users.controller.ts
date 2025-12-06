import {
  Controller,
  Get,
  Patch,
  Body,
  UseGuards,
  Request,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserDto } from './dto/user.dto';
import { ApiResponse, ApiBearerAuth, ApiTags, ApiQuery } from '@nestjs/swagger';
import { UserSearchQueryDto } from './dto/user-search-query.dto';
import { PaginatedUserResultDto } from './dto/paginated-user-result.dto';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('search')
  @ApiResponse({ status: 200, type: PaginatedUserResultDto })
  @ApiQuery({ name: 'q', required: true, description: 'The search query for name or mobile number.' })
  @ApiQuery({ name: 'page', required: false, description: 'The page number for pagination.', type: Number, schema: { default: 1 } })
  @ApiQuery({ name: 'limit', required: false, description: 'The number of items per page.', type: Number, schema: { default: 10 } })
  search(
    @Query(new ValidationPipe({ transform: true }))
    queryDto: UserSearchQueryDto,
  ): Promise<PaginatedUserResultDto> {
    return this.usersService.search(queryDto);
  }

  @Get('me')
  @ApiResponse({ status: 200, type: UserDto })
  getProfile(@Request() req): Promise<UserDto> {
    // req.user is populated by the JwtStrategy
    return this.usersService.findById(req.user.userId);
  }

  @Patch('me')
  @ApiResponse({ status: 200, type: UserDto })
  updateProfile(
    @Request() req,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<UserDto> {
    return this.usersService.updateProfile(req.user.userId, updateProfileDto);
  }
}
