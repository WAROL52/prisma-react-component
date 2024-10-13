"use client";

import { PrismaFieldRelation } from "../types";
import { DbAutoFieldProps } from "./DbAutoField";

export type DbAutoFieldRelationProps = DbAutoFieldProps & {
  dbField: PrismaFieldRelation
}

export function DbAutoFieldRelation(props: DbAutoFieldRelationProps) {
  return <div  >
    {props.dbField.fieldName}:{props.dbField.fieldType}
  </div>
}