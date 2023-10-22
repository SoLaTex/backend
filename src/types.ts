export type ResponseFormat <T = any> = {
  data: T;
  message: string;
};

export type ResponseInterceptorFormat<T = any> = ResponseFormat<T> & {
  status: number;
  timestamp: number;
};
