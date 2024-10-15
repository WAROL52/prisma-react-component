"use client";
import { Alert } from "@/components/ui/alert";
import { dbSchema, prismaEnumType, PrismaModelName } from "../types/generated/prismaSchema";
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
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { DevTool } from "@hookform/devtools";
import { useFormControl } from "./useFormControl";
export type DbAutoFormCreateProps<T extends PrismaModelName> = {
  modelName: T
  action: "create"
  dbModel: PrismaModel
};

export function DbAutoFormCreate<T extends PrismaModelName>(props: DbAutoFormCreateProps<T>) {
  const { toast } = useToast()
  const formControl = useFormControl(props)
  const { fieldControls, form } = formControl
  function onSubmit(data: any) {
    console.log({ data });

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
        {fieldControls.map(fieldControl => {
          if (fieldControl.dbField.row.includes("@id") && fieldControl.dbField.row.includes("@default")) {
            return null
          }
          return <DbAutoField key={fieldControl.dbField.fieldName} fieldControl={fieldControl} />
        })}
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
      <DevTool control={form.control} />
    </Form>
  );
}

function genZodType(model: PrismaModel, zodtype: z.ZodRawShape): z.ZodRawShape {
  model.fields.map(field => {
    if (field.row.includes("@id") && field.row.includes("@default")) {
      return null
    }
    if (field.originalType === "Int")
      zodtype[field.fieldName] = z.number()
    else if (field.originalType === "BigInt")
      zodtype[field.fieldName] = z.bigint()
    else if (field.originalType === "Boolean")
      zodtype[field.fieldName] = z.boolean()
    else if (field.originalType === "Bytes")
      zodtype[field.fieldName] = z.string()
    else if (field.originalType === "DateTime")
      zodtype[field.fieldName] = z.date()
    else if (field.originalType === "Decimal")
      zodtype[field.fieldName] = z.number()
    else if (field.originalType === "Float")
      zodtype[field.fieldName] = z.number()
    else if (field.originalType === "Json")
      zodtype[field.fieldName] = z.string()
    else if (field.originalType === "String")
      zodtype[field.fieldName] = z.string()
    else if (field.originalType === "Unsupported")
      zodtype[field.fieldName] = z.string()
    else if (field.fieldType == 'enum') {
      zodtype[field.fieldName] = z.enum(prismaEnumType[field.originalType])
    }
    else
      zodtype[field.fieldName] = z.string().optional()
    if (field.accessType == "optional" || field.accessType == "list") {
      zodtype[field.fieldName] = zodtype[field.fieldName].optional()
    }
  })
  return zodtype
}