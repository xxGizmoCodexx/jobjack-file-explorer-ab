import { Global, Module } from '@nestjs/common';
import { FileUtilService } from './file-util.service';

@Global()
@Module({
  providers: [FileUtilService],
  exports: [FileUtilService],
})
export class FileUtilModule {}
