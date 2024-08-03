import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from '../utils/swagger/swagger';
import { ResponseInterceptor } from './money-changer/interceptors/response.interceptor';
import { HttpExceptionFilter } from '../utils/common/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
    transform: true, 
    whitelist: true,
  }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  setupSwagger(app);

  await app.listen(3000);
}
bootstrap();
