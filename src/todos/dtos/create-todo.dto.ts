export class CreateTodoDto {
  constructor(public readonly title: string, public readonly order: number) {}
}
