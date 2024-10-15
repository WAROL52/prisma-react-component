"use client";

import { PRISMA_FIELD_ENUM, PRISMA_FIELD_RELATION, PRISMA_FIELD_SCALAR, PrismaField, PrismaModel } from "../types";
import { UseFormReturn } from "react-hook-form";
import { DbAutoFieldScalar } from "./DbAutoFieldScalar";
import { DbAutoFieldEnum } from "./DbAutoFieldEnum";
import { DbAutoFieldRelation } from "./DbAutoFieldRelation";
import { FieldControl } from "./useFormControl";
export type DbAutoFieldProps = {
  fieldControl: FieldControl
}

export function DbAutoField({ fieldControl }: DbAutoFieldProps) {
  if (fieldControl.dbField.fieldType === PRISMA_FIELD_SCALAR) {
    return <DbAutoFieldScalar dbField={fieldControl.dbField} fieldControl={fieldControl} />
  }
  if (fieldControl.dbField.fieldType === PRISMA_FIELD_ENUM) {
    return <DbAutoFieldEnum dbField={fieldControl.dbField} fieldControl={fieldControl} />
  }
  if (fieldControl.dbField.fieldType === PRISMA_FIELD_RELATION) {
    return <DbAutoFieldRelation dbField={fieldControl.dbField} fieldControl={fieldControl} />
  }
  return null
}

