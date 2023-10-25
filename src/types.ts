export type ResponseFormat<T = any> = {
  data: T;
  message: string;
};

export type ResponseInterceptorFormat<T = any> = ResponseFormat<T> & {
  status: number;
  timestamp: number;
};

export type CurrentUserType = {
  id: string;
  token: string;
};

export enum SymbolType {
  Variable = "variable",
  Constant = "constant",
  Function = "function",
}
