import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions } from 'typeorm';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { ListTodoParamsDto } from './dtos/list-todo-params.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';
import { TodoNotFoundException } from './exceptions/todo-404.exception';
import { ITodosService } from './interfaces/todos.service';
import { TodosEntity } from './todos.entity';
import { TodosRepository } from './todos.repository';

@Injectable()
export class TodosService implements ITodosService {
  constructor(
    @InjectRepository(TodosRepository)
    private readonly todosRepo: TodosRepository,
  ) {}

  async create({ title, order }: CreateTodoDto): Promise<TodosEntity> {
    const newTodo = this.todosRepo.create({ title, order });
    return this.todosRepo.createAndRebuildOrder(newTodo);
  }

  async update(id: string, data: UpdateTodoDto): Promise<TodosEntity> {
    const found = await this.todosRepo.findOne(id);

    if (!found) {
      throw new TodoNotFoundException();
    }

    if (data.title) {
      found.title = data.title;
    }

    return data.order && data.order !== found.order
      ? await this.todosRepo.updateAndRebuildOrder(found, data.order)
      : await this.todosRepo.save(found, { transaction: true });
  }

  async remove(id: string): Promise<void> {
    const found = await this.todosRepo.findOne(id);

    if (!found) {
      throw new TodoNotFoundException();
    }

    await this.todosRepo.removeAndRebuildOrder(found);
  }

  async list(query: ListTodoParamsDto) {
    const opts: FindManyOptions<TodosEntity> = {};

    if (query.order) {
      opts.order = {
        [query.sort]: query.order,
      };
    }

    return this.todosRepo.find(opts);
  }
}
