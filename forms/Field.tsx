import { FC } from "react";
import { PrismaFieldTypeOrinale } from "../types";
import { DbAutoFieldProps } from "./DbAutoField";

type FieldVariant = Record<string,FC<DbAutoFieldProps>>
type FieldType = Partial<Record<PrismaFieldTypeOrinale,FieldVariant>>

export const Field:FieldType={
    Int:{
    }
}