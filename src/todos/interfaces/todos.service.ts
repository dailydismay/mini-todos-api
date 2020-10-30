import { CreateTodoDto } from '../dtos/create-todo.dto';
import { ListTodoParamsDto } from '../dtos/list-todo-params.dto';
import { UpdateTodoDto } from '../dtos/update-todo.dto';
import { TodosEntity } from '../todos.entity';

export interface ITodosService {
  create(data: CreateTodoDto): Promise<TodosEntity>;
  update(id: string, data: UpdateTodoDto): Promise<TodosEntity>;
  remove(id: string): Promise<void>;
  list(query: ListTodoParamsDto): Promise<TodosEntity[]>;
}
