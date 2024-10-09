
import { PrismaSchema } from "..";

export const prismaModelNames = ["User","Folder","File","Profile","Post","Category"] as const;
export type PrismaModelName = (typeof prismaModelNames)[number];

export const prismaEnumType = {"Role":["USER","  ADMIN"],"Action":["GET","  CREATE","  UPDATE","  DELETE"]} as const;
export type PrismaEnumType = (typeof prismaEnumType);
export type PrismaEnumTypeName = keyof PrismaEnumType;

export const prismaSchema:PrismaSchema={
    models:[
  {
    "modelName": "User",
    "fields": [
      {
        "row": "actions Action[]",
        "fieldName": "actions",
        "fieldType": "enum",
        "isUnique": false,
        "originalType": "Action",
        "accessType": "list",
        "hasDefaultValue": false,
        "type": "Action[]",
        "infoMeta": {}
      },
      {
        "row": "id      Int      @id @default(autoincrement())",
        "fieldName": "id",
        "fieldType": "scalar",
        "isUnique": false,
        "originalType": "Int",
        "accessType": "require",
        "hasDefaultValue": true,
        "type": "Int",
        "infoMeta": {}
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
        "infoMeta": {}
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
        "infoMeta": {}
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
        "infoMeta": {}
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
        "infoMeta": {}
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
        "infoMeta": {}
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
        "infoMeta": {}
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
        "infoMeta": {}
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
        "infoMeta": {}
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
        "infoMeta": {}
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
        "infoMeta": {}
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
        "infoMeta": {}
      },
      {
        "row": "parent    Folder?  @relation(\"Parent45Folder\", fields: [parentId], references: [id])",
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
          "relationName": "Parent45Folder"
        },
        "infoMeta": {}
      },
      {
        "row": "children  Folder[] @relation(\"Parent45Folder\")",
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
          "relationName": "Parent45Folder"
        },
        "infoMeta": {}
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
        "infoMeta": {}
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
        "infoMeta": {}
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
        "infoMeta": {}
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
        "infoMeta": {}
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
        "infoMeta": {}
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
        "infoMeta": {}
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
        "infoMeta": {}
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
        "infoMeta": {}
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
        "infoMeta": {}
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
        "infoMeta": {}
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
        "infoMeta": {}
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
        "infoMeta": {}
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
        "infoMeta": {}
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
        "infoMeta": {}
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
        "infoMeta": {}
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
        "infoMeta": {}
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
        "infoMeta": {}
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
        "infoMeta": {}
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
        "infoMeta": {}
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
        "infoMeta": {}
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
        "infoMeta": {}
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
        "infoMeta": {}
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
        "infoMeta": {}
      }
    ],
    "infoMeta": {}
  }
],
    infoMeta:{},
    enumType: prismaEnumType,
    modelNames:prismaModelNames as unknown as PrismaModelName[]
  }
  