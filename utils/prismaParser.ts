import { z } from "zod";
import {
  parsePrismaEnum,
  parsePrismaField,
  parsePrismaModel,
  PrismaEnumRegexResult,
  PrismaFieldType,
  PrismaFieldTypeOrinale,
  PrismaScalarType,
  prismaScalarTypes,
  PrismaModel,
  prismaModelRegex,
  PrismaModelRegexResult,
  PrismaSchema,
  PrismaFieldTypeRelation,
  PrismaFieldRegexResult,
  PrismaFieldScalar,
  PrismaField,
  PrismaFieldEnum,
  PrismaFieldRelation,
} from "../types";
import {
  PrismaModelName,
  PrismaEnumType,
} from "../types/generated/prismaSchema";

let enumTypeGlobal: Partial<PrismaEnumType> = {};
export function toPrismaSchema(dataString: string): PrismaSchema {
  const enumType = getPrismaEnums(dataString);
  enumTypeGlobal = {
    ...enumType,
  };
  const models = getPrismaModels(dataString);
  linkAllRelation(models);
  return {
    models,
    infoMeta: {},
    enumType,
    modelNames: models.map((model) => model.modelName),
  };
}

function linkAllRelation(models: PrismaModel[]) {
  models.forEach((model) => {
    const fields = model.fields.filter(
      (field) => field.fieldType == "relation"
    );
    fields.forEach((field) => {
      const otherModel = models.find(
        (model) => model.modelName == field.originalType
      );
      if (!otherModel) {
        return;
      }
      const otherFields = otherModel.fields.filter((otherField) => {
        if (otherField.fieldType != "relation") {
          return false;
        }
        if (otherField.originalType != model.modelName) {
          return false;
        }
        if (otherModel.modelName === model.modelName) {
          if (otherField.row === field.row) {
            return false;
          }
        }
        if (otherField.type.otherFieldName && field.type.otherFieldName) {
          return otherField.type.otherFieldName === field.type.otherFieldName;
        }
        return true;
      }) as PrismaFieldRelation[];
      const otherField = otherFields.at(0);
      if (!otherField) {
        console.warn("otherField not found!");
        return;
      }
      if (otherFields.length != 1) {
        console.warn("Many otherField is founded!. The first is taked");
        return;
      }
      syncRelation(model, otherModel, field, otherField);
    });
  });
}

function syncRelation(
  model: PrismaModel,
  otherModel: PrismaModel,
  field: PrismaFieldRelation,
  otherField: PrismaFieldRelation
) {
  field.type.otherFieldName = otherField.fieldName;
  if (field.type.type.includes("[]")) {
    if (otherField.type.type.includes("[]")) {
      field.type.relationType = "many-to-many";
    } else field.type.relationType = "many-to-one";
  } else {
    if (otherField.type.type.includes("[]")) {
      field.type.relationType = "one-to-many";
    } else field.type.relationType = "one-to-one";
  }
}

function getPrismaEnums(data: string): PrismaEnumType {
  const prismaModelRegexResults = parsePrismaEnum(data);
  const enumType: PrismaEnumType = {} as unknown as PrismaEnumType;
  prismaModelRegexResults.map((result) => {
    const enumInfo = getPrismaEnum(result);
    //@ts-ignore
    enumType[enumInfo.name] = enumInfo.values.map((value) =>
      value.replaceAll(" ", "")
    );
  });
  return enumType;
}

function getPrismaEnum(result: PrismaEnumRegexResult) {
  return {
    name: result.groups.name,
    values: result.groups.fields.split("\n"),
  };
}

function getPrismaModels(data: string): PrismaModel[] {
  const prismaModelRegexResults = parsePrismaModel(data);
  return prismaModelRegexResults.map(getPrismaModel);
}

function getPrismaModel(result: PrismaModelRegexResult): PrismaModel {
  const fields = getPrismaFields(result);
  return {
    modelName: result.groups.name as PrismaModelName,
    fields: fields,
    infoMeta: {},
  };
}

function getPrismaFields(
  result: PrismaModelRegexResult
): PrismaModel["fields"] {
  const resultField = parsePrismaField(result.groups.fields);
  return resultField
    .map((field) => {
      const row = field.groups.field;
      const rows = row.split(" ").filter((col) => col);
      let fieldRes: null | PrismaField = getFieldScalar(field, row, rows);
      if (fieldRes) return fieldRes;
      fieldRes = getFieldEnum(field, row, rows);
      if (fieldRes) return fieldRes;
      fieldRes = getFieldRelation(field, row, rows);
      return fieldRes;
    })
    .map((field) => field as PrismaField);
}

function getFieldScalar(
  field: PrismaFieldRegexResult,
  row: string,
  rows: string[]
): null | PrismaFieldScalar {
  const [type, originalType] = getPrismaFieldType(row, rows) as [
    PrismaFieldScalar["type"],
    PrismaFieldScalar["originalType"]
  ];
  if (!prismaScalarTypes.includes(originalType)) {
    return null;
  }
  return {
    row,
    fieldName: String(rows.at(0)),
    fieldType: "scalar",
    isUnique: row.includes("@unique"),
    originalType,
    accessType: getaccessType(row),
    hasDefaultValue: row.includes("@default"),
    type,
    infoMeta: {},
    validation: null,
  };
}
function getZodTypeScalar(type: PrismaScalarType): z.ZodTypeAny {
  return z.any();
}
function getFieldEnum(
  field: PrismaFieldRegexResult,
  row: string,
  rows: string[]
): null | PrismaFieldEnum {
  const [type, originalType] = getPrismaFieldType(row, rows) as [
    PrismaFieldEnum["type"],
    PrismaFieldEnum["originalType"]
  ];
  if (!Object.keys(enumTypeGlobal).includes(originalType)) {
    return null;
  }
  const enumList = [...enumTypeGlobal[originalType]!] as [string, ...string[]];
  return {
    row,
    fieldName: String(rows.at(0)),
    fieldType: "enum",
    isUnique: row.includes("@unique"),
    originalType,
    accessType: getaccessType(row),
    hasDefaultValue: row.includes("@default"),
    type,
    infoMeta: {},
    validation: null,
  };
}

function getFieldRelation(
  field: PrismaFieldRegexResult,
  row: string,
  rows: string[]
): null | PrismaFieldRelation {
  const [type, originalType] = getPrismaFieldType(row, rows) as [
    PrismaFieldRelation["type"],
    PrismaFieldRelation["originalType"]
  ];
  if (typeof type != "object") return null;
  console.log([field.groups.description]);
  return {
    row,
    fieldName: String(rows.at(0)),
    fieldType: "relation",
    isUnique: row.includes("@unique"),
    originalType,
    accessType: getaccessType(row),
    hasDefaultValue: row.includes("@default"),
    type,
    infoMeta: {},
    validation: null,
  };
}

function getaccessType(row: string) {
  return row.includes("?")
    ? "optional"
    : row.includes("[]")
    ? "list"
    : "require";
}
function getPrismaFieldType(
  row: string,
  rows: string[]
): [PrismaField["type"], PrismaField["originalType"]] {
  const typedef = rows[1] as PrismaFieldType;
  const type: PrismaFieldType = typedef;
  let originalType = type
    .toString()
    .replace("?", "")
    .replace("[]", "") as PrismaFieldTypeOrinale;
  if (prismaScalarTypes.includes(originalType as PrismaScalarType)) {
    return [type, originalType];
  }
  if (Object.keys(enumTypeGlobal).includes(originalType)) {
    return [type, originalType];
  }
  return [
    {
      otherFieldName: "",
      otherModelName: originalType,
      type: type as PrismaModelName,
      relationType: "one-to-many",
      relationName: /\@relation\("([\w]+)"/.exec(row)?.[1] || null,
    },
    originalType,
  ] as [PrismaFieldTypeRelation, PrismaFieldTypeOrinale];
}
