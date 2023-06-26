import { LoggerService } from '@nestjs/common';
import { stdout } from 'process';

export class MyLogger implements LoggerService {
  error(message: any) {
    stdout.write(`[Error] ${message}\n`);
  }

  warn(message: any) {
    stdout.write(`[Warn] ${message}\n`);
  }

  debug?(message: any) {
    stdout.write(`[Debug] ${message}\n`);
  }

  verbose?(message: any) {
    stdout.write(`[Verbose] ${message}\n`);
  }

  log(message: any) {
    stdout.write(`[Log] ${message}\n`);
  }
}
