"use client";

import { PrismaFieldEnum } from "../types";
import { DbAutoFieldProps } from "./DbAutoField";
import { DbAutoFieldBase, DbAutoFieldBaseProps } from "./DbAutoFieldBase";

export type DbAutoFieldEnumProps = DbAutoFieldProps&{
    field:PrismaFieldEnum
}

export function DbAutoFieldEnum(props: DbAutoFieldEnumProps) {
  return <DbAutoFieldBase {...props} >
    123
  </DbAutoFieldBase>
}