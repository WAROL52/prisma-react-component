

import { PrismaModel, PrismaSchema, PrismaTypeEnum } from "../types/index.ts";
import { toPrismaSchema } from "../utils/prismaParser.ts";

console.log({
  age: 25,
});

export type GenPrismaSchemaProps={
  prismaModelNames:string[]
  prismaSchema:PrismaSchema
}
function genPrismaSchema(props:GenPrismaSchemaProps) {
  const prismaModelNames = JSON.stringify(props.prismaModelNames,null,2)
  const prismaSchema = JSON.stringify(props.prismaSchema,null,3)
  return `
import { PrismaSchema } from "..";

export const prismaModelNames = ${prismaModelNames} as const;
export type PrismaModelName = (typeof prismaModelNames)[number];

export const prismaSchema:PrismaSchema=${prismaSchema}
  `
}

function main() {
  const dataString: string=(``)
  const prismaSchema=toPrismaSchema(dataString)
  // const prismaModelNames = prismaSchema.models.map(model=>model.modelName)
  // const content=genPrismaSchema({
  //   prismaModelNames,
  //   prismaSchema
  // })
  console.log("content");
  
}


console.log({mande:true})
// main()