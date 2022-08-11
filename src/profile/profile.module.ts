import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from 'src/auth/auth.module';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { PROFILE_PACKAGE_NAME, PROFILE_SERVICE_NAME } from './proto/profile.pb';

@Module({
  controllers: [ProfileController],
  imports: [
    AuthModule,
    ClientsModule.register([
      {
        name: PROFILE_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: 'localhost:50052',
          package: PROFILE_PACKAGE_NAME,
          protoPath: 'proto/profile/profile.proto',
        },
      },
    ]),
  ],
  providers: [ProfileService],
})
export class ProfileModule {}
