"use client";

import { Alert } from "@/components/ui/alert";
import { PrismaModelName, dbSchema } from "../types/generated/prismaSchema";
import { DbAutoFormCreate, DbAutoFormCreateProps } from "./DbAutoFormCreate";
import { DbAutoFormUpdate, DbAutoFormUpdateProps } from "./DbAutoFormUpdate";

export type DbAutoFormBase<T extends PrismaModelName> = {
    modelName: T
};
type OmitProps = "dbModel"
export type DbAutoFormProps<T extends PrismaModelName> = Omit<DbAutoFormCreateProps<T>, OmitProps> | Omit<DbAutoFormUpdateProps<T>, OmitProps>

export function DbAutoForm<T extends PrismaModelName>(props: DbAutoFormProps<T>) {
    const model = dbSchema.models.find(model => model.modelName === props.modelName)
    if (!model) {
        return <Alert variant={"destructive"} > modelName not found! </Alert>
    }
    if (props.action == "update") {
        return <DbAutoFormUpdate {...props} model={model} />;
    }
    return <DbAutoFormCreate {...props} dbModel={model} />;
}


