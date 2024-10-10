
import { PrismaSchema } from "..";

export const prismaModelNames = ["User","Folder","File","Profile","Post","Category"] as const;
export type PrismaModelName = (typeof prismaModelNames)[number];

export const prismaEnumType = {"Role":["USER","  ADMIN"],"Action":["GET","  CREATE","  UPDATE","  DELETE"]} as const;
export type PrismaEnumType = (typeof prismaEnumType);
export type PrismaEnumTypeName = keyof PrismaEnumType;

export const dbSchema:PrismaSchema={
    models:[
  {
    "modelName": "User",
    "fields": [
      {
        "row": "id      Int      @id @default(autoincrement())",
        "fieldName": "id",
        "fieldType": "scalar",
        "isUnique": false,
        "originalType": "Int",
        "accessType": "require",
        "hasDefaultValue": true,
        "type": "Int",
        "infoMeta": {},
        "validation": null
      },
      {
        "row": "actions Action[]",
        "fieldName": "actions",
        "fieldType": "enum",
        "isUnique": false,
        "originalType": "Action",
        "accessType": "list",
        "hasDefaultValue": false,
        "type": "Action[]",
        "infoMeta": {},
        "validation": null
      },
      {
        "row": "email   String   @unique",
        "fieldName": "email",
        "fieldType": "scalar",
        "isUnique": true,
        "originalType": "String",
        "accessType": "require",
        "hasDefaultValue": false,
        "type": "String",
        "infoMeta": {},
        "validation": null
      },
      {
        "row": "name    String?",
        "fieldName": "name",
        "fieldType": "scalar",
        "isUnique": false,
        "originalType": "String",
        "accessType": "optional",
        "hasDefaultValue": false,
        "type": "String?",
        "infoMeta": {},
        "validation": null
      },
      {
        "row": "surnom    String?",
        "fieldName": "surnom",
        "fieldType": "scalar",
        "isUnique": false,
        "originalType": "String",
        "accessType": "optional",
        "hasDefaultValue": false,
        "type": "String?",
        "infoMeta": {},
        "validation": null
      },
      {
        "row": "age    Int?",
        "fieldName": "age",
        "fieldType": "scalar",
        "isUnique": false,
        "originalType": "Int",
        "accessType": "optional",
        "hasDefaultValue": false,
        "type": "Int?",
        "infoMeta": {},
        "validation": null
      },
      {
        "row": "dateNaissance    DateTime?",
        "fieldName": "dateNaissance",
        "fieldType": "scalar",
        "isUnique": false,
        "originalType": "DateTime",
        "accessType": "optional",
        "hasDefaultValue": false,
        "type": "DateTime?",
        "infoMeta": {},
        "validation": null
      },
      {
        "row": "taille    Decimal?",
        "fieldName": "taille",
        "fieldType": "scalar",
        "isUnique": false,
        "originalType": "Decimal",
        "accessType": "optional",
        "hasDefaultValue": false,
        "type": "Decimal?",
        "infoMeta": {},
        "validation": null
      },
      {
        "row": "nom String",
        "fieldName": "nom",
        "fieldType": "scalar",
        "isUnique": false,
        "originalType": "String",
        "accessType": "require",
        "hasDefaultValue": false,
        "type": "String",
        "infoMeta": {},
        "validation": null
      },
      {
        "row": "role    Role     @default(USER)",
        "fieldName": "role",
        "fieldType": "enum",
        "isUnique": false,
        "originalType": "Role",
        "accessType": "require",
        "hasDefaultValue": true,
        "type": "Role",
        "infoMeta": {},
        "validation": null
      },
      {
        "row": "posts   Post[]",
        "fieldName": "posts",
        "fieldType": "relation",
        "isUnique": false,
        "originalType": "Post",
        "accessType": "list",
        "hasDefaultValue": false,
        "type": {
          "otherFieldName": "author",
          "otherModelName": "Post",
          "type": "Post[]",
          "relationType": "many-to-one",
          "relationName": null
        },
        "infoMeta": {},
        "validation": null
      },
      {
        "row": "folders  Folder[]",
        "fieldName": "folders",
        "fieldType": "relation",
        "isUnique": false,
        "originalType": "Folder",
        "accessType": "list",
        "hasDefaultValue": false,
        "type": {
          "otherFieldName": "owner",
          "otherModelName": "Folder",
          "type": "Folder[]",
          "relationType": "many-to-one",
          "relationName": null
        },
        "infoMeta": {},
        "validation": null
      },
      {
        "row": "profile Profile?",
        "fieldName": "profile",
        "fieldType": "relation",
        "isUnique": false,
        "originalType": "Profile",
        "accessType": "optional",
        "hasDefaultValue": false,
        "type": {
          "otherFieldName": "user",
          "otherModelName": "Profile",
          "type": "Profile?",
          "relationType": "one-to-one",
          "relationName": null
        },
        "infoMeta": {},
        "validation": null
      }
    ],
    "infoMeta": {}
  },
  {
    "modelName": "Folder",
    "fields": [
      {
        "row": "id        Int      @id @default(autoincrement())",
        "fieldName": "id",
        "fieldType": "scalar",
        "isUnique": false,
        "originalType": "Int",
        "accessType": "require",
        "hasDefaultValue": true,
        "type": "Int",
        "infoMeta": {},
        "validation": null
      },
      {
        "row": "name      String",
        "fieldName": "name",
        "fieldType": "scalar",
        "isUnique": false,
        "originalType": "String",
        "accessType": "require",
        "hasDefaultValue": false,
        "type": "String",
        "infoMeta": {},
        "validation": null
      },
      {
        "row": "ownerId   Int",
        "fieldName": "ownerId",
        "fieldType": "scalar",
        "isUnique": false,
        "originalType": "Int",
        "accessType": "require",
        "hasDefaultValue": false,
        "type": "Int",
        "infoMeta": {},
        "validation": null
      },
      {
        "row": "owner     User     @relation(fields: [ownerId], references: [id])",
        "fieldName": "owner",
        "fieldType": "relation",
        "isUnique": false,
        "originalType": "User",
        "accessType": "require",
        "hasDefaultValue": false,
        "type": {
          "otherFieldName": "folders",
          "otherModelName": "User",
          "type": "User",
          "relationType": "one-to-many",
          "relationName": null
        },
        "infoMeta": {},
        "validation": null
      },
      {
        "row": "parentId  Int?",
        "fieldName": "parentId",
        "fieldType": "scalar",
        "isUnique": false,
        "originalType": "Int",
        "accessType": "optional",
        "hasDefaultValue": false,
        "type": "Int?",
        "infoMeta": {},
        "validation": null
      },
      {
        "row": "parent    Folder?  @relation(\"ParentFolder\", fields: [parentId], references: [id])",
        "fieldName": "parent",
        "fieldType": "relation",
        "isUnique": false,
        "originalType": "Folder",
        "accessType": "optional",
        "hasDefaultValue": false,
        "type": {
          "otherFieldName": "children",
          "otherModelName": "Folder",
          "type": "Folder?",
          "relationType": "one-to-many",
          "relationName": "ParentFolder"
        },
        "infoMeta": {},
        "validation": null
      },
      {
        "row": "children  Folder[] @relation(\"ParentFolder\")",
        "fieldName": "children",
        "fieldType": "relation",
        "isUnique": false,
        "originalType": "Folder",
        "accessType": "list",
        "hasDefaultValue": false,
        "type": {
          "otherFieldName": "parent",
          "otherModelName": "Folder",
          "type": "Folder[]",
          "relationType": "many-to-one",
          "relationName": "ParentFolder"
        },
        "infoMeta": {},
        "validation": null
      },
      {
        "row": "files     File[]",
        "fieldName": "files",
        "fieldType": "relation",
        "isUnique": false,
        "originalType": "File",
        "accessType": "list",
        "hasDefaultValue": false,
        "type": {
          "otherFieldName": "folder",
          "otherModelName": "File",
          "type": "File[]",
          "relationType": "many-to-one",
          "relationName": null
        },
        "infoMeta": {},
        "validation": null
      }
    ],
    "infoMeta": {}
  },
  {
    "modelName": "File",
    "fields": [
      {
        "row": "id        Int      @id @default(autoincrement())",
        "fieldName": "id",
        "fieldType": "scalar",
        "isUnique": false,
        "originalType": "Int",
        "accessType": "require",
        "hasDefaultValue": true,
        "type": "Int",
        "infoMeta": {},
        "validation": null
      },
      {
        "row": "name      String",
        "fieldName": "name",
        "fieldType": "scalar",
        "isUnique": false,
        "originalType": "String",
        "accessType": "require",
        "hasDefaultValue": false,
        "type": "String",
        "infoMeta": {},
        "validation": null
      },
      {
        "row": "path      String",
        "fieldName": "path",
        "fieldType": "scalar",
        "isUnique": false,
        "originalType": "String",
        "accessType": "require",
        "hasDefaultValue": false,
        "type": "String",
        "infoMeta": {},
        "validation": null
      },
      {
        "row": "folderId  Int",
        "fieldName": "folderId",
        "fieldType": "scalar",
        "isUnique": false,
        "originalType": "Int",
        "accessType": "require",
        "hasDefaultValue": false,
        "type": "Int",
        "infoMeta": {},
        "validation": null
      },
      {
        "row": "folder    Folder   @relation(fields: [folderId], references: [id])",
        "fieldName": "folder",
        "fieldType": "relation",
        "isUnique": false,
        "originalType": "Folder",
        "accessType": "require",
        "hasDefaultValue": false,
        "type": {
          "otherFieldName": "files",
          "otherModelName": "Folder",
          "type": "Folder",
          "relationType": "one-to-many",
          "relationName": null
        },
        "infoMeta": {},
        "validation": null
      }
    ],
    "infoMeta": {}
  },
  {
    "modelName": "Profile",
    "fields": [
      {
        "row": "id     Int    @id @default(autoincrement())",
        "fieldName": "id",
        "fieldType": "scalar",
        "isUnique": false,
        "originalType": "Int",
        "accessType": "require",
        "hasDefaultValue": true,
        "type": "Int",
        "infoMeta": {},
        "validation": null
      },
      {
        "row": "bio    String",
        "fieldName": "bio",
        "fieldType": "scalar",
        "isUnique": false,
        "originalType": "String",
        "accessType": "require",
        "hasDefaultValue": false,
        "type": "String",
        "infoMeta": {},
        "validation": null
      },
      {
        "row": "user   User   @relation(fields: [userId], references: [id])",
        "fieldName": "user",
        "fieldType": "relation",
        "isUnique": false,
        "originalType": "User",
        "accessType": "require",
        "hasDefaultValue": false,
        "type": {
          "otherFieldName": "profile",
          "otherModelName": "User",
          "type": "User",
          "relationType": "one-to-one",
          "relationName": null
        },
        "infoMeta": {},
        "validation": null
      },
      {
        "row": "userId Int    @unique",
        "fieldName": "userId",
        "fieldType": "scalar",
        "isUnique": true,
        "originalType": "Int",
        "accessType": "require",
        "hasDefaultValue": false,
        "type": "Int",
        "infoMeta": {},
        "validation": null
      }
    ],
    "infoMeta": {}
  },
  {
    "modelName": "Post",
    "fields": [
      {
        "row": "id         Int        @id @default(autoincrement())",
        "fieldName": "id",
        "fieldType": "scalar",
        "isUnique": false,
        "originalType": "Int",
        "accessType": "require",
        "hasDefaultValue": true,
        "type": "Int",
        "infoMeta": {},
        "validation": null
      },
      {
        "row": "createdAt  DateTime   @default(now())",
        "fieldName": "createdAt",
        "fieldType": "scalar",
        "isUnique": false,
        "originalType": "DateTime",
        "accessType": "require",
        "hasDefaultValue": true,
        "type": "DateTime",
        "infoMeta": {},
        "validation": null
      },
      {
        "row": "updatedAt  DateTime   @updatedAt",
        "fieldName": "updatedAt",
        "fieldType": "scalar",
        "isUnique": false,
        "originalType": "DateTime",
        "accessType": "require",
        "hasDefaultValue": false,
        "type": "DateTime",
        "infoMeta": {},
        "validation": null
      },
      {
        "row": "title      String",
        "fieldName": "title",
        "fieldType": "scalar",
        "isUnique": false,
        "originalType": "String",
        "accessType": "require",
        "hasDefaultValue": false,
        "type": "String",
        "infoMeta": {},
        "validation": null
      },
      {
        "row": "published  Boolean    @default(false)",
        "fieldName": "published",
        "fieldType": "scalar",
        "isUnique": false,
        "originalType": "Boolean",
        "accessType": "require",
        "hasDefaultValue": true,
        "type": "Boolean",
        "infoMeta": {},
        "validation": null
      },
      {
        "row": "author     User       @relation(fields: [authorId], references: [id])",
        "fieldName": "author",
        "fieldType": "relation",
        "isUnique": false,
        "originalType": "User",
        "accessType": "require",
        "hasDefaultValue": false,
        "type": {
          "otherFieldName": "posts",
          "otherModelName": "User",
          "type": "User",
          "relationType": "one-to-many",
          "relationName": null
        },
        "infoMeta": {},
        "validation": null
      },
      {
        "row": "authorId   Int",
        "fieldName": "authorId",
        "fieldType": "scalar",
        "isUnique": false,
        "originalType": "Int",
        "accessType": "require",
        "hasDefaultValue": false,
        "type": "Int",
        "infoMeta": {},
        "validation": null
      },
      {
        "row": "categories Category[]",
        "fieldName": "categories",
        "fieldType": "relation",
        "isUnique": false,
        "originalType": "Category",
        "accessType": "list",
        "hasDefaultValue": false,
        "type": {
          "otherFieldName": "posts",
          "otherModelName": "Category",
          "type": "Category[]",
          "relationType": "many-to-many",
          "relationName": null
        },
        "infoMeta": {},
        "validation": null
      },
      {
        "row": "actions Action[]",
        "fieldName": "actions",
        "fieldType": "enum",
        "isUnique": false,
        "originalType": "Action",
        "accessType": "list",
        "hasDefaultValue": false,
        "type": "Action[]",
        "infoMeta": {},
        "validation": null
      }
    ],
    "infoMeta": {}
  },
  {
    "modelName": "Category",
    "fields": [
      {
        "row": "id    Int    @id @default(autoincrement())",
        "fieldName": "id",
        "fieldType": "scalar",
        "isUnique": false,
        "originalType": "Int",
        "accessType": "require",
        "hasDefaultValue": true,
        "type": "Int",
        "infoMeta": {},
        "validation": null
      },
      {
        "row": "name  String",
        "fieldName": "name",
        "fieldType": "scalar",
        "isUnique": false,
        "originalType": "String",
        "accessType": "require",
        "hasDefaultValue": false,
        "type": "String",
        "infoMeta": {},
        "validation": null
      },
      {
        "row": "posts Post[]",
        "fieldName": "posts",
        "fieldType": "relation",
        "isUnique": false,
        "originalType": "Post",
        "accessType": "list",
        "hasDefaultValue": false,
        "type": {
          "otherFieldName": "categories",
          "otherModelName": "Post",
          "type": "Post[]",
          "relationType": "many-to-many",
          "relationName": null
        },
        "infoMeta": {},
        "validation": null
      },
      {
        "row": "action Action?",
        "fieldName": "action",
        "fieldType": "enum",
        "isUnique": false,
        "originalType": "Action",
        "accessType": "optional",
        "hasDefaultValue": false,
        "type": "Action?",
        "infoMeta": {},
        "validation": null
      }
    ],
    "infoMeta": {}
  }
],
    infoMeta:{},
    enumType: prismaEnumType,
    modelNames:prismaModelNames as unknown as PrismaModelName[]
  }
  