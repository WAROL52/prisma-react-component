import { PrismaSchema } from "..";

export const prismaModelNames = [] as const;
export type PrismaModelName = (typeof prismaModelNames)[number];

export const prismaSchema:PrismaSchema={
    enums:[],
    models:[]
}

