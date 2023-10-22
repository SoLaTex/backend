import { ResponseFormat } from "../types";

export function formatResultForResponseInterceptor<T> (
  data: T, message: string): ResponseFormat<T> {
  return { data, message };
}
