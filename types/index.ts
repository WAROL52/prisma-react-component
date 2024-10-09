import { PrismaModelName } from "./generated/prismaSchema";


export type PrismaFieldValidationMessage = {
  message: string;
  value: number | string | boolean;
};

export type PrismaFieldValidation = {
  max: null | PrismaFieldValidationMessage;
  min: null | PrismaFieldValidationMessage;
  length: null | PrismaFieldValidationMessage;
  email: null | PrismaFieldValidationMessage;
  url: null | PrismaFieldValidationMessage;
  emoji: null | PrismaFieldValidationMessage;
  uuid: null | PrismaFieldValidationMessage;
  cuid: null | PrismaFieldValidationMessage;
  cuid2: null | PrismaFieldValidationMessage;
  ulid: null | PrismaFieldValidationMessage;
  regex: null | PrismaFieldValidationMessage;
  includes: null | PrismaFieldValidationMessage;
  startsWith: null | PrismaFieldValidationMessage;
  endsWith: null | PrismaFieldValidationMessage;
  datetime: null | PrismaFieldValidationMessage;
  ip: null | PrismaFieldValidationMessage;

  toTrim: null | PrismaFieldValidationMessage;
  toLowerCase: null | PrismaFieldValidationMessage;
  toUpperCase: null | PrismaFieldValidationMessage;
  gt: null | PrismaFieldValidationMessage;
  gte: null | PrismaFieldValidationMessage;
  lt: null | PrismaFieldValidationMessage;
  lte: null | PrismaFieldValidationMessage;

  int: null | PrismaFieldValidationMessage;

  positive: null | PrismaFieldValidationMessage;
  nonnegative: null | PrismaFieldValidationMessage;
  negative: null | PrismaFieldValidationMessage;
  nonpositive: null | PrismaFieldValidationMessage;

  multipleOf: null | PrismaFieldValidationMessage;

  finite: null | PrismaFieldValidationMessage;
  safe: null | PrismaFieldValidationMessage;
};

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

export type PrismaInfoMetaDefault = {
  col:{}
  className:string
  label:string
  descriptioin:string
  validation$:PrismaFieldValidation
  variant:string
  visibled:boolean
  disabled:boolean
}

export type PrismaInfoMeta=Partial<PrismaInfoMetaDefault&Record<string,string|Partial<Record<string,string>>>>

export const prismaFieldTypeScalarNumbers = [
  "Int",
  "BigInt",
  "Float",
  "Decimal",
] as const;

export const prismaFieldTypeScalars = [
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

export type PrismaTypeEnum = {
  isEnumType:true
  name: string;
  values: string[];
};

export type PrismaFieldTypeScalar = (typeof prismaFieldTypeScalars)[number];

export type PrismaFieldTypeRelation = {
  isRelationType:true
  modelName: PrismaModelName;
  fieldName: string;
  type: PrismaModelName | `${PrismaModelName}?` | `${PrismaModelName}[]`;
  relationType: "one-to-one" | "one-to-many" | "many-to-one" | "many-to-many";
};

export type PrismaFieldTypeOrinale = PrismaFieldTypeScalar | PrismaModelName
  
  export type PrismaFieldType =
  | PrismaTypeEnum
  | PrismaFieldTypeRelation
  |PrismaFieldTypeScalar
  | `${PrismaFieldTypeScalar}?`
  | `${PrismaFieldTypeScalar}[]`;

export type PrismaField = {
  row:string
  name: string;
  label: null | string;
  originalType:null| PrismaFieldTypeOrinale;
  type: PrismaFieldType;
  validation: null | Partial<PrismaFieldValidation>;
  isUnique: boolean;
};

export type PrismaModel = {
  modelName: PrismaModelName;
  fields: PrismaField[];
  scalarFields: {
    required: string[];
    optional: string[];
    array: string[];
    all: string[];
  };
  relationFields: {
    oneToOne: string[];
    oneToOneRequired: string[];
    oneToOneOptional: string[];
    oneToMany: string[];
    oneToManyRequired: string[];
    oneToManyOptional: string[];
    manyToOne: string[];
    manyToOneRequired: string[];
    manyToOneOptional: string[];
    manyToMany: string[];
  };
};

export type PrismaSchema = {
  infoMeta:PrismaInfoMeta
  models: PrismaModel[];
  enums:PrismaTypeEnum[]
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
  /(?<description>(?:\/\/+?[^\n]*\n+\s*)*) *(?<field>\w[^\n]*?) *(?<symbole>\/\/+[^\n]*?)? *\n/g;

export type PrismaFieldRegexResult={
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
