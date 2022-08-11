/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'Auth';

/** auth/auth.proto */

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  error: string[];
  jwt: string;
}

export interface AuthenticateRequest {
  jwt: string;
}

export interface AuthenticateResponse {
  status: number;
  error: string[];
  userId: number;
}

export interface User {
  email: string;
  password: string;
}

export const AUTH_PACKAGE_NAME = 'Auth';

export interface AuthServiceClient {
  login(request: LoginRequest): Observable<LoginResponse>;

  authenticate(request: AuthenticateRequest): Observable<AuthenticateResponse>;
}

export interface AuthServiceController {
  login(
    request: LoginRequest,
  ): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse;

  authenticate(
    request: AuthenticateRequest,
  ):
    | Promise<AuthenticateResponse>
    | Observable<AuthenticateResponse>
    | AuthenticateResponse;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['login', 'authenticate'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('AuthService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('AuthService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const AUTH_SERVICE_NAME = 'AuthService';
