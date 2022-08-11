/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'Profile';

/** profile/profile.proto */

export interface GetProfileRequest {
  userId: number;
}

export interface GetProfileResponse {
  status: number;
  error: string[];
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface Profile {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export const PROFILE_PACKAGE_NAME = 'Profile';

export interface ProfileServiceClient {
  getProfile(request: GetProfileRequest): Observable<GetProfileResponse>;
}

export interface ProfileServiceController {
  getProfile(
    request: GetProfileRequest,
  ):
    | Promise<GetProfileResponse>
    | Observable<GetProfileResponse>
    | GetProfileResponse;
}

export function ProfileServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['getProfile'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('ProfileService', method)(
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
      GrpcStreamMethod('ProfileService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const PROFILE_SERVICE_NAME = 'ProfileService';
