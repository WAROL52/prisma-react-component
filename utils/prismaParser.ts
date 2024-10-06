import { PrismaSchema } from "../types";

export function toPrismaSchema(dataString: string): PrismaSchema {
  dataString.split("");
  //   prismaModelRegex
  return {
    models: [],
    enums: [],
  };
}
