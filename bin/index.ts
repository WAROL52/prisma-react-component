import fs from "fs";
import { PrismaSchema } from "../types/index";
import { toPrismaSchema } from "../utils/prismaParser";
import { PRISMA_FILE_PATH, PRISMA_SCHEMA_FILE_PATH } from "../config";

export type GenPrismaSchemaProps={
  prismaModelNames:string[]
  prismaSchema:PrismaSchema
}

function genPrismaSchema(props:GenPrismaSchemaProps) {
  const prismaModelNames = JSON.stringify(props.prismaModelNames,null,0)
  const enumType=JSON.stringify(props.prismaSchema.enumType,null,0)
  const models = JSON.stringify(props.prismaSchema.models,null,2)
  const infoMeta = JSON.stringify(props.prismaSchema.infoMeta,null,3)
  return `
import { PrismaSchema } from "..";

export const prismaModelNames = ${prismaModelNames} as const;
export type PrismaModelName = (typeof prismaModelNames)[number];

export const prismaEnumType = ${enumType} as const;
export type PrismaEnumType = (typeof prismaEnumType);
export type PrismaEnumTypeName = keyof PrismaEnumType;

export const prismaSchema:PrismaSchema={
    models:${models},
    infoMeta:${infoMeta},
    enumType: prismaEnumType,
    modelNames:prismaModelNames as unknown as PrismaModelName[]
  }
  `
}

function main() {
  const dataString = fs.readFileSync(PRISMA_FILE_PATH, { encoding: "utf-8" })
  const prismaSchema=toPrismaSchema(dataString)
  const prismaModelNames = prismaSchema.models.map(model=>model.modelName)
  const content=genPrismaSchema({
    prismaModelNames,
    prismaSchema
  })
  fs.writeFileSync(PRISMA_SCHEMA_FILE_PATH,content)
  console.log(PRISMA_SCHEMA_FILE_PATH,"OK");
}


main()
// npx bun ./prisma-react-component/bin/index.ts
