import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GeneratorController } from './generator/generator.controller';

@Module({
  imports: [HttpModule, ConfigModule.forRoot()],
  controllers: [AppController, GeneratorController],
  providers: [AppService],
})
export class AppModule {}
