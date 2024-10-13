"use client";

import { PrismaFieldEnum } from "../types";
import { DbAutoFieldProps } from "./DbAutoField";
import { FieldRadio } from "./fields/FieldRadio";

export type DbAutoFieldEnumProps = DbAutoFieldProps & {
  dbField: PrismaFieldEnum
}

export function DbAutoFieldEnum(props: DbAutoFieldEnumProps) {
  if (props.dbField.fieldType != "enum") {
    return null
  }
  return <FieldRadio {...props} />
}