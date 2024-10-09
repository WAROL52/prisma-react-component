
import { PrismaSchema, PrismaTypeEnum } from "..";

export const prismaModelNames = ["User"] as const;
export type PrismaModelName = (typeof prismaModelNames)[number];

export const prismaFieldTypeEnums:PrismaTypeEnum[] = [] as const;
export type PrismaFieldTypeEnums = (typeof prismaFieldTypeEnums)[number];

export const prismaSchema:PrismaSchema={
    models:[
  {
    "modelName": "User",
    "fields": [
      {
        "row": "id    Int     @id @default(autoincrement())",
        "name": "id",
        "type": "Int",
        "originalType": "Int",
        "isUnique": false,
        "label": "",
        "validation": null
      },
      {
        "row": "email String  @unique",
        "name": "email",
        "type": "String",
        "originalType": "String",
        "isUnique": true,
        "label": "",
        "validation": null
      }
    ],
    "scalarFields": {
      "all": [],
      "array": [],
      "optional": [],
      "required": []
    },
    "relationFields": {
      "manyToMany": [],
      "manyToOne": [],
      "manyToOneOptional": [],
      "manyToOneRequired": [],
      "oneToMany": [],
      "oneToManyOptional": [],
      "oneToManyRequired": [],
      "oneToOne": [],
      "oneToOneOptional": [],
      "oneToOneRequired": []
    }
  }
],
    infoMeta:{},
    enums: prismaFieldTypeEnums,
    modelNames:prismaModelNames as unknown as PrismaModelName[]
  }
  