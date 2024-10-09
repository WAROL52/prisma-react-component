
import { PrismaSchema, PrismaTypeEnum } from "..";

export const prismaModelNames = ["User","Post"] as const;
export type PrismaModelName = (typeof prismaModelNames)[number];

export const prismaFieldTypeEnums:PrismaTypeEnum[] = [{"isEnumType":true,"name":"Role","values":["USER","  ADMIN"]}] as const;
export type PrismaFieldTypeEnums = (typeof prismaFieldTypeEnums)[number];

export const prismaSchema:PrismaSchema={
    models:[
  {
    "modelName": "User",
    "fields": [
      {
        "row": "id        Int      @id @default(autoincrement())",
        "name": "id",
        "type": "Int",
        "originalType": "Int",
        "isUnique": false,
        "label": "",
        "validation": null
      },
      {
        "row": "createdAt DateTime @default(now())",
        "name": "createdAt",
        "type": "DateTime",
        "originalType": "DateTime",
        "isUnique": false,
        "label": "",
        "validation": null
      },
      {
        "row": "email     String   @unique",
        "name": "email",
        "type": "String",
        "originalType": "String",
        "isUnique": true,
        "label": "",
        "validation": null
      },
      {
        "row": "name      String?",
        "name": "name",
        "type": "String?",
        "originalType": "String",
        "isUnique": false,
        "label": "",
        "validation": null
      },
      {
        "row": "role      Role     @default(USER)",
        "name": "role",
        "type": "Role",
        "originalType": "Role",
        "isUnique": false,
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
  },
  {
    "modelName": "Post",
    "fields": [
      {
        "row": "id        Int      @id @default(autoincrement())",
        "name": "id",
        "type": "Int",
        "originalType": "Int",
        "isUnique": false,
        "label": "",
        "validation": null
      },
      {
        "row": "createdAt DateTime @default(now())",
        "name": "createdAt",
        "type": "DateTime",
        "originalType": "DateTime",
        "isUnique": false,
        "label": "",
        "validation": null
      },
      {
        "row": "updatedAt DateTime @updatedAt",
        "name": "updatedAt",
        "type": "DateTime",
        "originalType": "DateTime",
        "isUnique": false,
        "label": "",
        "validation": null
      },
      {
        "row": "published Boolean  @default(false)",
        "name": "published",
        "type": "Boolean",
        "originalType": "Boolean",
        "isUnique": false,
        "label": "",
        "validation": null
      },
      {
        "row": "title     String   @db.VarChar(255)",
        "name": "title",
        "type": "String",
        "originalType": "String",
        "isUnique": false,
        "label": "",
        "validation": null
      },
      {
        "row": "author    User?    @relation(fields: [authorId], references: [id])",
        "name": "author",
        "type": "User?",
        "originalType": "User",
        "isUnique": false,
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
  