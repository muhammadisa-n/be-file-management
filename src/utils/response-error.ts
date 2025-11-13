export class ResponseError extends Error {
  public status: boolean;
  constructor(
    public status_code: number,
    public message: string
  ) {
    super(message);
    this.status = false;
  }
}
