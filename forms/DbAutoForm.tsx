"use client";

import { PrismaModelName } from "../types/generated/prismaSchema";
import { DbAutoFormCreate, DbAutoFormCreateProps } from "./DbAutoFormCreate";
import { DbAutoFormUpdate, DbAutoFormUpdateProps } from "./DbAutoFormUpdate";

export type DbAutoFormBase<T extends PrismaModelName> = {
    modelName:T
};

export type DbAutoFormProps<T extends PrismaModelName> = DbAutoFormCreateProps<T>|DbAutoFormUpdateProps<T>

export function DbAutoForm<T extends PrismaModelName>(props: DbAutoFormProps<T>) {
    if (props.action=="update") {
        return <DbAutoFormUpdate {...props} />;
    }
  return <DbAutoFormCreate {...props} />;
}


