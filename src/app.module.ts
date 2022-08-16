import { Module } from '@nestjs/common';
import { SocialNetworkModule } from '@SocialNetwork/socialNetwork.module';

@Module({
  imports: [SocialNetworkModule],
})
export class AppModule {}
