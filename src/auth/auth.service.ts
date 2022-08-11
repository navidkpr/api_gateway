import { Body, Inject, Injectable, Logger } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  AuthenticateRequest,
  AuthenticateResponse,
  AuthServiceClient,
  AUTH_SERVICE_NAME,
  LoginRequest,
  LoginResponse,
} from './proto/auth.pb';

@Injectable()
export class AuthService implements AuthServiceClient {
  private authSrv: AuthServiceClient;

  @Inject(AUTH_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.authSrv = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  public authenticate(
    request: AuthenticateRequest,
  ): Observable<AuthenticateResponse> {
    return this.authSrv.authenticate(request);
  }

  public login(request: LoginRequest): Observable<LoginResponse> {
    return this.authSrv.login(request);
  }
}
