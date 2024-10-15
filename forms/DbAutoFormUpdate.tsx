"use client";
import { PrismaModel } from "../types";
import { PrismaModelName } from "../types/generated/prismaSchema";
export type DbAutoFormUpdateProps<T extends PrismaModelName> = {
    modelName: T
    action: "update"
    dataId: any
    model: PrismaModel
};

export function DbAutoFormUpdate<T extends PrismaModelName>({ }: DbAutoFormUpdateProps<T>) {
    return <div>DbAutoForm</div>;
}
