import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TodosModule } from '../todos/todos.module';
import configFactory from '../config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExtendedConfigService } from '../config';

const commonImports = [
  ConfigModule.forRoot({
    isGlobal: true,
    load: [configFactory],
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (cfg: ExtendedConfigService) => cfg.get('ormConfig'),
  }),
];

@Module({
  imports: [...commonImports, TodosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
