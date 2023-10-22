import { plainToInstance } from "class-transformer";
import { ResponseFormat } from "../types";

export function Serialize(dto: any) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;

    descriptor.value = async function (...args: any[]): Promise<ResponseFormat> {
      const response = await original.apply(this, args);

        const data = plainToInstance(dto, response.data, {excludeExtraneousValues: true});

        return {
          data,
          message: response.message,
        };
    }

    return descriptor;
  };
}
