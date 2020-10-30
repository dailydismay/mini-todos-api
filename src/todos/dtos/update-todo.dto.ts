export class UpdateTodoDto {
  constructor(public readonly title?: string, public readonly order?: number) {}
}
