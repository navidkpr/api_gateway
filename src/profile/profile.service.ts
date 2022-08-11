import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  GetProfileRequest,
  GetProfileResponse,
  ProfileServiceClient,
  PROFILE_SERVICE_NAME,
} from './proto/profile.pb';

@Injectable()
export class ProfileService implements ProfileServiceClient {
  private profileSrv: ProfileServiceClient;

  @Inject(PROFILE_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.profileSrv =
      this.client.getService<ProfileServiceClient>(PROFILE_SERVICE_NAME);
  }

  getProfile(request: GetProfileRequest): Observable<GetProfileResponse> {
    return this.profileSrv.getProfile(request);
  }
}
