"use client";
import { PrismaModelName } from "../types/generated/prismaSchema";
export type DbAutoFormUpdateProps<T extends PrismaModelName> = {
    modelName:T
    action:"update"
    dataId:any
};

export function DbAutoFormUpdate<T extends PrismaModelName>({ }: DbAutoFormUpdateProps<T>) {
    return <div>DbAutoForm</div>;
}
