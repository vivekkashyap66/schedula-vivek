import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Frontend connect avvadaniki CORS allow chesthundi
  app.enableCors();

  // Cloud PORT ni theeskuntundi. '0.0.0.0' ivvadam Railway ki chala crucial!
  const port = process.env.PORT || 3000;
  // Replace your existing app.listen line with this:
  await app.listen(process.env.PORT || 3000, '0.0.0.0');

  console.log(`Application is running on port: ${port}`);
}
bootstrap();
