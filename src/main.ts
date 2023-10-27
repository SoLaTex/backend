import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import {
  BadRequestException, ValidationPipe,
} from "@nestjs/common";
import {
  Interceptor,
} from "./interceptor";
import {
  formatResultForResponseInterceptor, parseConstraints,
} from "./helpers/functions";

async function bootstrap () {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors) => {
      const result = {};
      // console.log({errors: JSON.stringify(errors)});
      // errors.forEach((error) => result[error.property] = Object.values(
      //   error.constraints)[0]);
      parseConstraints(errors, result);

      const response = formatResultForResponseInterceptor(result, "Validation failed!")

      return new BadRequestException(response);
    },
    whitelist: true,
  }));
  app.useGlobalInterceptors(
    new Interceptor(),
  );

  console.log("Server is running on port 5000!");
  await app.listen(5000);
}

bootstrap();
