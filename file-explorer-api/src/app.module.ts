import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DirectoryModule } from './features/directory/directory.module';

@Module({
  imports: [DirectoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
