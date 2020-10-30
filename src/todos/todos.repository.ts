import { EntityRepository, Repository } from 'typeorm';
import { TodosEntity } from './todos.entity';

@EntityRepository(TodosEntity)
export class TodosRepository extends Repository<TodosEntity> {
  createAndRebuildOrder(todo: TodosEntity): Promise<TodosEntity> {
    return this.manager.transaction(async manager => {
      await manager.query(
        `UPDATE todos SET "order" = "order" + 1 WHERE "order" >= ${todo.order};`,
      );

      const result = await manager.save(todo);
      return result;
    });
  }

  updateAndRebuildOrder(
    todo: TodosEntity,
    newOrder: number,
  ): Promise<TodosEntity> {
    return this.manager.transaction<TodosEntity>(async manager => {
      await manager.query(
        `UPDATE todos SET "order" = "order" + 1 WHERE "order" >= ${newOrder};`,
      );

      todo.order = newOrder;

      const result = await manager.save(todo);

      return result;
    });
  }

  removeAndRebuildOrder(todo: TodosEntity): Promise<void> {
    return this.manager.transaction(async manager => {
      await manager.query(
        `UPDATE todos SET "order" = "order" - 1 WHERE "order" > ${todo.order};`,
      );

      await manager.remove(todo);
    });
  }
}
