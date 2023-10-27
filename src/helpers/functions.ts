import { ResponseFormat } from "../types";
import { ValidationError } from "@nestjs/common";

export function formatResultForResponseInterceptor<T> (
  data: T, message: string): ResponseFormat<T> {
  return { data, message };
}

export function parseConstraints (data: Array<ValidationError>, result: Record<string, string>, parentKey: string = ''): void {
  data.forEach(item => {
    const key = parentKey ? `${parentKey}.${item.property}` : item.property;
    if (item.constraints) {
      result[key] = Object.values(item.constraints)[0];
    }
    if (item.children) {
      parseConstraints(item.children, result, key);
    }
  });
}
