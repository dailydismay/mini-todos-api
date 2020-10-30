import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { ListTodoParamsDto } from './dtos/list-todo-params.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async list(@Query() query: ListTodoParamsDto) {
    return this.todosService.list(query);
  }

  @Post()
  async create(@Body() body: CreateTodoDto) {
    return this.todosService.create(body);
  }

  @Put('/:id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateTodoDto,
  ) {
    return this.todosService.update(id, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.todosService.remove(id);
  }
}
