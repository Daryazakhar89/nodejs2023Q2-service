import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import config from '../../config';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, originalUrl } = request;

    response.on('finish', () => {
      const { statusCode } = response;

      const bodyData = JSON.stringify(request.body);

      this.logger.log(
        `Request: URL localhost:${config.PORT}${originalUrl} Query parameter ${method} Body ${bodyData}; Response: StatusCode ${statusCode}`,
      );
    });

    next();
  }
}
