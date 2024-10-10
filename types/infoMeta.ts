import { z } from "zod"

export type ZodObject = z.AnyZodObject

export type Size = "xs" | "sm" | "md" | "lg" | "xl"
export type Position = "top" | "bottom" | "left" | "right"

export type PrismaInfoMetaDefault = {
    col:{}
    className:string
    label:string
    description:string
    variant:string
    visibled:boolean
    disabled:boolean
    index:number
    radius:Size
    prefix:string
    suffix:string
    symbolRequired:string
    symbolOptional:string
}

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
  export type PrismaFieldValidationMessage = {
    message: string;
    value: number | string | boolean;
  };