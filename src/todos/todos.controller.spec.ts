import { Test, TestingModule } from '@nestjs/testing';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { ListTodoParamsDto } from './dtos/list-todo-params.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';
import { TodosController } from './todos.controller';
import { TodosEntity } from './todos.entity';
import { TodosService } from './todos.service';

describe('TodosController', () => {
  let controller: TodosController;
  let service: TodosService;

  const createdTodo = new TodosEntity();
  createdTodo.id = 'asjdkjaskljdlasjdjaskkldas1';
  createdTodo.title = 'created';
  createdTodo.order = 1;

  const updatedTodo = new TodosEntity();
  updatedTodo.id = 'asjdkjaskljdlasjdjaskkldas';
  updatedTodo.title = 'updated';
  updatedTodo.order = 2;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        {
          provide: TodosService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((_: CreateTodoDto) =>
                Promise.resolve(createdTodo),
              ),
            update: jest
              .fn()
              .mockImplementation((_: string, __: UpdateTodoDto) =>
                Promise.resolve(updatedTodo),
              ),
            remove: jest
              .fn()
              .mockImplementation((_: string) => Promise.resolve()),
            list: jest
              .fn()
              .mockImplementation((_: ListTodoParamsDto) =>
                Promise.resolve([]),
              ),
          },
        },
      ],
    }).compile();

    controller = module.get<TodosController>(TodosController);
    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a correct result with created todo', () => {
    expect(controller.create({ title: '123', order: 1 })).resolves.toEqual(
      createdTodo,
    );
  });

  it('should return a correct result with updated todo', () => {
    expect(
      controller.update(updatedTodo.id, { title: '123', order: 1 }),
    ).resolves.toEqual(updatedTodo);
  });

  it('should resolve a promise with removed todo', () => {
    expect(() => controller.remove('removedid')).not.toThrow();
  });

  it('should return an array result with list of todos', () => {
    expect(controller.list(null)).resolves.toBeInstanceOf(Array);
  });
});
