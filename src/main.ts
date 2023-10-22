import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { BadRequestException, ValidationPipe } from "@nestjs/common";
import {
  FormatResponseInterceptor
} from "./interceptors/formatResponse.interceptor";

async function bootstrap () {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors) => {
      const result = {};
      errors.forEach((error) => result[error.property] = Object.values(error.constraints)[0]);

      return new BadRequestException(result);
    },
    whitelist: true,
    transform: true,
  }));
  app.useGlobalInterceptors(new FormatResponseInterceptor());

  console.log("Server is running on port 5000!");
  await app.listen(5000);
}

bootstrap();
