"use client";

import { PrismaFieldRelation } from "../types";
import { DbAutoFieldProps } from "./DbAutoField";
import { DbAutoFieldBase, DbAutoFieldBaseProps } from "./DbAutoFieldBase";

export type DbAutoFieldRelationProps = DbAutoFieldProps&{
    field:PrismaFieldRelation
}

export function DbAutoFieldRelation(props: DbAutoFieldRelationProps) {
  return <DbAutoFieldBase {...props} >
  123
</DbAutoFieldBase>
}