import { ConfigService } from '@nestjs/config';
import { ConfigFactory } from '@nestjs/config/dist/interfaces';
import { TodosEntity } from '../todos/todos.entity';
import { ConnectionOptions } from 'typeorm';

export interface IConfig {
  port: number;
  ormConfig: ConnectionOptions;
}

const configFactory: ConfigFactory<IConfig> = () => {
  const port = +process.env.PORT || 3000;
  const ormConfig: ConnectionOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || 'database',
    port: +process.env.DB_PORT || 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    ssl: false,
    entities: [TodosEntity],
    // не стал париться за миграции из-за одной таблицы
    synchronize: true,
  };

  return { port, ormConfig };
};

export interface ExtendedConfigService extends ConfigService<IConfig> {}

export default configFactory;
