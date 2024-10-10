"use client";

import { PRISMA_FIELD_ENUM, PRISMA_FIELD_RELATION, PRISMA_FIELD_SCALAR, PrismaField, PrismaModel } from "../types";
import { UseFormReturn } from "react-hook-form";
import { DbAutoFieldScalar } from "./DbAutoFieldScalar";
import { DbAutoFieldEnum } from "./DbAutoFieldEnum";
import { DbAutoFieldRelation } from "./DbAutoFieldRelation";
export type DbAutoFieldProps = {
    model:PrismaModel
  field:PrismaField
  form:UseFormReturn
}

export function DbAutoField(props: DbAutoFieldProps) {
    if (props.field.fieldType === PRISMA_FIELD_SCALAR) {
        return <DbAutoFieldScalar {...props} field={props.field} />
    }
    if (props.field.fieldType === PRISMA_FIELD_ENUM) {
        return <DbAutoFieldEnum {...props} field={props.field} />
    }
    if (props.field.fieldType === PRISMA_FIELD_RELATION) {
        return <DbAutoFieldRelation {...props} field={props.field}  />
    }
  return null
}

