export interface IFieldError {
  [name: string]: string;
}

export interface IError {
  status: number;
  error: string;
  message: string;
  fields?: IFieldError;
}
