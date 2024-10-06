export type PrismaModelName = string;

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
  name: string;
  values: string[];
};

export type PrismaFieldTypeScalar = (typeof prismaFieldTypeScalars)[number];

export type PrismaFieldTypeRelation = {
  modelName: PrismaModelName;
  fieldName: string;
  type: PrismaModelName | `${PrismaModelName}?` | `${PrismaModelName}[]`;
  relationType: "one-to-one" | "one-to-many" | "many-to-one" | "many-to-many";
};

export type PrismaFieldTypeOrinale =
  | PrismaFieldTypeScalar
  | PrismaFieldTypeRelation
  | PrismaTypeEnum;

export type PrismaFieldType =
  | PrismaFieldTypeOrinale
  | `${PrismaFieldTypeScalar}?`
  | `${PrismaFieldTypeScalar}[]`;

export type PrismaField = {
  label: null | string;
  name: string;
  originalType: PrismaFieldTypeOrinale;
  type: PrismaFieldType;
  validation: null | PrismaFieldValidation;
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
  models: PrismaModel[];
  enums: PrismaTypeEnum[];
};

export const prismaModelRegex =
  /(?<description>(?:\/\/+?[^\n]*?\n\s*)*)model +(?<name>\w+) +{\s+(?<fields>[^]+?)\n\s*?}/g;

export const prismaFieldRegex =
  /(?<description>(?:\/\/+?[^\n]*\n+\s*)*) *(?<field>\w[^\n]*?) *(?<symbole>\/\/+[^\n]*?)? *\n/g;
