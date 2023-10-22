export type ResponseFormat = {
  data: any;
  message: string;
};

export type ResponseInterceptorFormat = ResponseFormat & {
  status: number;
  timestamp: number;
};
