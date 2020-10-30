import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SaveOptions } from 'typeorm';
import { TodoNotFoundException } from './exceptions/todo-404.exception';
import { TodosEntity } from './todos.entity';
import { TodosRepository } from './todos.repository';
import { TodosService } from './todos.service';

describe('TodosService', () => {
  let service: TodosService = null;
  let repo: TodosRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: getRepositoryToken(TodosRepository),
          useValue: {
            findOne: jest.fn(),
            find: jest.fn(),
            create: jest.fn().mockReturnValue(null),
            save: jest
              .fn()
              .mockImplementation((x: TodosEntity, _?: SaveOptions) =>
                Promise.resolve(x),
              ),
            createAndRebuildOrder: jest
              .fn()
              .mockImplementation(x => Promise.resolve(x)),
            updateAndRebuildOrder: jest
              .fn()
              .mockImplementation(x => Promise.resolve(x)),
            removeAndRebuildOrder: jest
              .fn()
              .mockImplementation(x => Promise.resolve(x)),
          },
        },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
    repo = module.get<TodosRepository>(getRepositoryToken(TodosRepository));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a todo', () => {
    const newTodo: TodosEntity = {
      id: '1123',
      title: '123',
      order: 1,
    };

    const spy = jest
      .spyOn(repo, 'createAndRebuildOrder')
      .mockResolvedValue(newTodo);

    expect(
      service.create({ title: newTodo.id, order: newTodo.order }),
    ).resolves.toBe(newTodo);

    expect(spy).toBeCalled();
  });

  it('should update title of a found todo', () => {
    const updatedTodo = new TodosEntity();
    updatedTodo.id = 'uhasdfjhdjl';
    updatedTodo.title = 'uhasdfjhdjl';

    const spyFindOne = jest
      .spyOn(repo, 'findOne')
      .mockResolvedValue(updatedTodo);

    expect(service.update(updatedTodo.id, {})).resolves.toBe(updatedTodo);

    expect(spyFindOne).toBeCalledWith(updatedTodo.id);
  });

  it('should update order of a found todo', () => {
    const updatedTodo = new TodosEntity();
    updatedTodo.id = 'uhasdfjhdjl';
    updatedTodo.title = 'uhasdfjhdjl';
    updatedTodo.order = 1;

    const spyFindOne = jest
      .spyOn(repo, 'findOne')
      .mockResolvedValue(updatedTodo);

    expect(
      service.update(updatedTodo.id, { order: updatedTodo.order + 3 }),
    ).resolves.toBe(updatedTodo);

    expect(spyFindOne).toBeCalledWith(updatedTodo.id);
  });

  it('should throw not found todo', () => {
    const spy = jest.spyOn(repo, 'findOne').mockResolvedValue(null);

    const fakeId = '123123123';

    expect(service.update(fakeId, {})).rejects.toBeInstanceOf(
      TodoNotFoundException,
    );

    expect(spy).toBeCalledWith(fakeId);
  });

  it('should remove a found todo', () => {
    const removedTodo = new TodosEntity();
    removedTodo.id = 'uhasdfjhdjl';
    removedTodo.title = 'uhasdfjhdjl';
    removedTodo.order = 1;

    const spyFindOne = jest
      .spyOn(repo, 'findOne')
      .mockResolvedValue(removedTodo);

    expect(() => service.remove(removedTodo.id)).not.toThrow();

    expect(spyFindOne).toBeCalledWith(removedTodo.id);
  });

  it('should throw a not found todo to remove', () => {
    const spyFindOne = jest.spyOn(repo, 'findOne').mockResolvedValue(null);

    expect(service.remove('123123')).rejects.toBeInstanceOf(
      TodoNotFoundException,
    );
    expect(spyFindOne).toBeCalled();
  });

  it('should return an array like repo returns', () => {
    const spyFind = jest.spyOn(repo, 'find').mockResolvedValue([]);

    expect(
      service.list({ order: 'DESC', sort: 'order' }),
    ).resolves.toBeInstanceOf(Array);
  });
});
