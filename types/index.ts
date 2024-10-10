import { ZodAny, ZodAnyDef, ZodTypeAny } from "zod";
import { PrismaModelName, PrismaEnumType, PrismaEnumTypeName } from "./generated/prismaSchema";
import { PrismaInfoMetaDefault, ZodObject } from "./infoMeta";

export type PrismaAttributeArguments = {
  fields: string[];
  name?: string;
  map?: string;
  length?: number;
  sort?: "Asc" | "Desc";
  clustered?: boolean;
};

export type PrismaFieldAttributeRelationTrigger =
  | null
  | "Cascade"
  | "NoAction"
  | "Restrict"
  | "SetNull";

export type PrismaFieldAttributeRelation =
  | Omit<PrismaAttributeArguments, "sort" | "clustered" | "fields">
  | (Omit<PrismaAttributeArguments, "sort" | "clustered"> & {
      onUpdate?: PrismaFieldAttributeRelationTrigger;
      onDelete?: PrismaFieldAttributeRelationTrigger;
      references: string[];
    });

export type PrismaFieldAttributes = {
  "@id": null | boolean | Omit<PrismaAttributeArguments, "fields" | "name">;

  "@default": null | unknown;
  "@unique":
    | null
    | boolean
    | Omit<PrismaAttributeArguments, "fields" | "name" | "clustered">;
  "@relation": null | PrismaFieldAttributeRelation;
  "@map": null | string | { name: string };
  "@updatedAt": null | boolean;
  "@ignore": null | boolean;
};



export type PrismaInfoMeta=Partial<PrismaInfoMetaDefault&Record<string,string|Partial<Record<string,string>>>>

export const prismaFieldTypeScalarNumbers = [
  "Int",
  "BigInt",
  "Float",
  "Decimal",
] as const;

export const prismaScalarTypes = [
  "String",
  "Boolean",
  "DateTime",
  "Json",
  "Bytes",
  "Unsupported",
  ...prismaFieldTypeScalarNumbers,
] as const;

export type PrismaFieldTypeScalarNumber =
  (typeof prismaFieldTypeScalarNumbers)[number];

export type PrismaScalarType = (typeof prismaScalarTypes)[number];

export type PrismaFieldTypeRelation = {
  otherModelName: PrismaModelName;
  otherFieldName: string;
  type: PrismaModelName | `${PrismaModelName}?` | `${PrismaModelName}[]`;
  relationType: "one-to-one" | "one-to-many" | "many-to-one" | "many-to-many";
  relationName:null|string
};

export type PrismaFieldTypeOrinale = PrismaScalarType | PrismaModelName | PrismaEnumTypeName
  
  export type PrismaFieldType =
  | PrismaEnumTypeName
  | `${PrismaEnumTypeName}?`
  | `${PrismaEnumTypeName}[]`
  | PrismaFieldTypeRelation
  |PrismaScalarType
  | `${PrismaScalarType}?`
  | `${PrismaScalarType}[]`;

export type PrismaFieldBase = {
  row:string
  fieldName: string;
  infoMeta:PrismaInfoMeta
  isUnique: boolean;
  accessType:"require"|"optional"|"list"
  hasDefaultValue:boolean
  validation:null|string
};
export const PRISMA_FIELD_SCALAR="scalar"
export const PRISMA_FIELD_ENUM="enum"
export const PRISMA_FIELD_RELATION="relation"

export type PrismaFieldScalar = PrismaFieldBase & {
  fieldType:typeof PRISMA_FIELD_SCALAR,
  originalType:PrismaScalarType;
  type: PrismaScalarType
  | `${PrismaScalarType}?`
  | `${PrismaScalarType}[]`;
}

export type PrismaFieldEnum = PrismaFieldBase & {
  fieldType:typeof PRISMA_FIELD_ENUM
  originalType:PrismaEnumTypeName;
  type: PrismaEnumTypeName
  | `${PrismaEnumTypeName}?`
  | `${PrismaEnumTypeName}[]`
}

export type PrismaFieldRelation = PrismaFieldBase & {
  fieldType:typeof PRISMA_FIELD_RELATION
  originalType:PrismaModelName;
  type: PrismaFieldTypeRelation;
}

export type PrismaField = PrismaFieldScalar | PrismaFieldEnum | PrismaFieldRelation

export type PrismaModel = {
  modelName: PrismaModelName;
  fields: PrismaField[];
  infoMeta:PrismaInfoMeta
};

export type PrismaSchema = {
  infoMeta:PrismaInfoMeta
  models: PrismaModel[];
  enumType:PrismaEnumType
  modelNames:PrismaModelName[]
};

export const prismaModelRegex =
  /(?<description>(?:\/\/+?[^\n]*?\n\s*)*)model +(?<name>\w+) +{\s+(?<fields>[^]+?)\n\s*?}/g;

export type PrismaModelRegexResult={
  index:number,
  groups:{
    description:string,
    name:string,
    fields:string
  }
}

export const prismaFieldRegex =
  /(?<description>(?:\/\/+?[^\n]*\n+\s*)*) *(?<field>\w[^\n]*?) *(?<symbole>\/\/+[^\n]*?)?\s*(?:\n|$)/gm;

export type PrismaFieldRegexResult = {
  index:number,
  groups:{
    description:string,
    field:string
    symbole:string,
  }
}

export function parsePrismaModel(data:string):PrismaModelRegexResult[] {
  return [...data.matchAll(prismaModelRegex)].map(el=>{
    return {
      index:el.index,
      groups:(el.groups || {}) as PrismaModelRegexResult["groups"]
    }
  })
}

export function parsePrismaField(data:string):PrismaFieldRegexResult[] {
  return [...data.matchAll(prismaFieldRegex)].map(el=>{
    return {
      index:el.index,
      groups:(el.groups || {}) as PrismaFieldRegexResult["groups"]
    }
  })
}

export const prismaEnumRegex =
  /(?<description>(?:\/\/+?[^\n]*?\n\s*)*)enum +(?<name>\w+) +{\s+(?<fields>[^]+?)\n\s*?}/g;

export type PrismaEnumRegexResult={
  index:number,
  groups:{
    description:string,
    name:string,
    fields:string
  }
}
export function parsePrismaEnum(data:string):PrismaEnumRegexResult[] {
  return [...data.matchAll(prismaEnumRegex)].map(el=>{
    return {
      index:el.index,
      groups:(el.groups || {}) as PrismaEnumRegexResult["groups"]
    }
  })
}
