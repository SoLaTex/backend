import { ResponseFormat } from "../types";

export function formatResultForResponseInterceptor (
  data: any, message: string): ResponseFormat {
  return { data, message };
}
