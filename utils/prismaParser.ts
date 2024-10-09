import { parsePrismaEnum, parsePrismaField, parsePrismaModel, PrismaEnumRegexResult, PrismaFieldType, PrismaFieldTypeOrinale, PrismaFieldTypeScalar, prismaFieldTypeScalars, PrismaModel, prismaModelRegex, PrismaModelRegexResult, PrismaSchema } from "../types";
import { PrismaFieldTypeEnums, PrismaModelName } from "../types/generated/prismaSchema";

export function toPrismaSchema(dataString: string): PrismaSchema {
  const enums = getPrismaEnums(dataString)
  const models= getPrismaModels(dataString)

  return {
    models,
    infoMeta:{},
    enums,
    modelNames:models.map(model=>model.modelName)
  };
}

function getPrismaEnums(data:string):PrismaFieldTypeEnums[] {
  const prismaModelRegexResults=parsePrismaEnum(data)
  return prismaModelRegexResults.map(getPrismaEnum)
}

function getPrismaEnum(result:PrismaEnumRegexResult):PrismaFieldTypeEnums {
  return {
    isEnumType:true,
    name:result.groups.name,
    values:result.groups.fields.split("\n")
  }
}

function getPrismaModels(data:string):PrismaModel[] {
  const prismaModelRegexResults=parsePrismaModel(data)
  return prismaModelRegexResults.map(getPrismaModel)
}

function getPrismaModel(result:PrismaModelRegexResult):PrismaModel {
  const fields = getPrismaFields(result) 
  return {
    modelName:result.groups.name as PrismaModelName,
    fields:fields,
    scalarFields:getScalarFields(result),
    relationFields:getRelationFields(result)
  }
}

function getScalarFields(result:PrismaModelRegexResult):PrismaModel["scalarFields"] {
  return {
    all:[],
    array:[],
    optional:[],
    required:[]
  }
}

function getRelationFields(result:PrismaModelRegexResult):PrismaModel["relationFields"] {
  return {
    manyToMany:[],
    manyToOne:[],
    manyToOneOptional:[],
    manyToOneRequired:[],
    oneToMany:[],
    oneToManyOptional:[],
    oneToManyRequired:[],
    oneToOne:[],
    oneToOneOptional:[],
    oneToOneRequired:[],
  }
}

function getPrismaFields(result:PrismaModelRegexResult):PrismaModel["fields"] {
  const resultField=parsePrismaField(result.groups.fields)
  return resultField.map(field=>{
    const row = field.groups.field
    const rows = row.split(" ").filter(col=>col)
    const [type,originalType]=getPrismaFieldType(row,rows)
    return {
      row,
      name:rows[0],
      type,
      originalType,
      isUnique:row.includes("@unique"),
      label:"",
      validation:null
    }
  })
}

function getPrismaFieldType(row:string,rows:string[]) {
  const typedef = rows[1] as PrismaFieldType
  const type:PrismaFieldType=typedef
  let originalType = type.toString().replace("?","").replace("[]","") as PrismaFieldTypeOrinale
  return [type,originalType] as const
}
