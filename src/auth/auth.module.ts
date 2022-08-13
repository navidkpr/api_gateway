import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { AUTH_PACKAGE_NAME, AUTH_SERVICE_NAME } from './proto/auth.pb';

@Module({
  providers: [AuthService],
  imports: [
    ClientsModule.register([
      {
        name: AUTH_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: process.env.AUTH_SVC_ADDRESS,
          package: AUTH_PACKAGE_NAME,
          protoPath: 'proto/auth/auth.proto',
        },
      },
    ]),
  ],
  exports: [AuthService],
})
export class AuthModule {}
