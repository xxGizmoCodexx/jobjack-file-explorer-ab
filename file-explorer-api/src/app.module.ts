import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DirectoryModule } from './features/directory/directory.module';
import { FileUtilModule } from './utils/file-util/file-util.module';

@Module({
  imports: [DirectoryModule, FileUtilModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
