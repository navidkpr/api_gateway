import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { AuthenticateResponse } from 'src/auth/proto/auth.pb';
import * as grpc from '@grpc/grpc-js';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
  ) {}

  @Get('/')
  public async getProfile(@Body() body: { jwt: string }): Promise<any> {
    const authResponse = await firstValueFrom(
      this.authService.authenticate(body),
    );
    if (authResponse.status === grpc.status.OK) {
      const profileResponse = await firstValueFrom(
        this.profileService.getProfile({ userId: authResponse.userId }),
      );
      return profileResponse;
    }
    throw new UnauthorizedException();
  }
}
