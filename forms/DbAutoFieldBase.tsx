"use client";
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
import { ControllerFieldState, ControllerRenderProps, UseFormReturn, UseFormStateReturn } from "react-hook-form";
import { PrismaField, PrismaModel } from "../types";
import { FC, ReactNode } from "react";
import { DbAutoFieldProps } from "./DbAutoField";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
export type DbAutoFieldBaseProps = DbAutoFieldProps&{
  FieldComponent:FC<DbAutoFieldComponentProps>
};
export type DbAutoFieldComponentProps=
{
  dbField:DbAutoFieldProps
  field: ControllerRenderProps<any,any>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<any>;
}

export function DbAutoFieldBase({FieldComponent,...props}: DbAutoFieldBaseProps) {
  if (!FieldComponent) {
    return null
  }
  return <FormField
  control={props.form.control}
  name={props.field.fieldName}
  render={(renderProps) =>{
    return  (
      <FormItem>
      <FormLabel> {props.field.fieldName} </FormLabel>
      <FormControl >
        <FieldComponent {...renderProps} dbField={props}  />
      </FormControl>
      <FormDescription>
        {props.field.infoMeta.description}
      </FormDescription>
      <FormMessage />
      </FormItem>
    )}
  }
  />
}
