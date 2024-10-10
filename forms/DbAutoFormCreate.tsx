"use client";
import { Alert } from "@/components/ui/alert";
import { dbSchema, PrismaModelName } from "../types/generated/prismaSchema";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnyZodObject, z, ZodObject } from "zod";
import { DbAutoField } from "./DbAutoField";
import { Form } from "@/components/ui/form";
import { PrismaModel } from "../types";
export type DbAutoFormCreateProps<T extends PrismaModelName> = {
    modelName:T
    action:"create"
};

export function DbAutoFormCreate<T extends PrismaModelName>(props: DbAutoFormCreateProps<T>) {
    const model=dbSchema.models.find(model=>model.modelName === props.modelName)
    if (!model) {
        return <Alert variant={"destructive"} > modelName not found! </Alert>
    }
    const zodtype=z.object(genZodType(model,{}))
    console.log(genZodType(model,{}));
    
    const form = useForm({
        resolver: zodResolver(zodtype),
      });
      const onSubmit = (data:any) => {
        console.log("Form Submitted:", data);
      };
    
      return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
            {model.fields.map(field=>{
                if (field.row.includes("@id") && field.row.includes("@default")) {
                    return null
                }
                return <DbAutoField key={field.fieldName} field={field} form={form} model={model} />
            })}
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
        </Form>
      );
}

function genZodType(model:PrismaModel,zodtype:z.ZodRawShape):z.ZodRawShape {
  model.fields.map(field=>{
    if (field.originalType === "Int")
      zodtype[field.fieldName]= z.number().int().max(2**31).min(-(2**31))
    else if (field.originalType === "BigInt")
      zodtype[field.fieldName]= z.bigint()
    else if (field.originalType === "Boolean")
      zodtype[field.fieldName]= z.boolean()
    else if (field.originalType === "Bytes")
      zodtype[field.fieldName]= z.string()
    else if (field.originalType === "DateTime")
      zodtype[field.fieldName]= z.date()
    else if (field.originalType === "Decimal")
      zodtype[field.fieldName]= z.number()
    else if (field.originalType === "Float")
      zodtype[field.fieldName]= z.number()
    else if (field.originalType === "Json")
      zodtype[field.fieldName]= z.string()
    else if (field.originalType === "String")
      zodtype[field.fieldName]= z.string()
    else if (field.originalType === "Unsupported")
      zodtype[field.fieldName]= z.string()
    else
      zodtype[field.fieldName] = z.any() 
  })
  return zodtype
}