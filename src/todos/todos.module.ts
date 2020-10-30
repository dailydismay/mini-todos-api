import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosController } from './todos.controller';
import { TodosRepository } from './todos.repository';
import { TodosService } from './todos.service';

@Module({
  imports: [TypeOrmModule.forFeature([TodosRepository])],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
