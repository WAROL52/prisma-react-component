"use client";

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PrismaFieldRelation } from "../types";
import { DbAutoFieldProps } from "./DbAutoField";
import { FieldInputString } from "./fields/FieldInputString";
import { Input } from "@/components/ui/input";
import { useFieldControl } from "./useFieldControl";

export type DbAutoFieldRelationProps = DbAutoFieldProps & {
  dbField: PrismaFieldRelation
}

export function DbAutoFieldRelation({ fieldControl }: DbAutoFieldRelationProps) {
  const { dbField, dbModel, form } = fieldControl
  const { label, name, description } = useFieldControl({ fieldControl })
  return <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel >{label}</FormLabel>
        <FormControl>
          <Input {...field} />
        </FormControl>
        <FormDescription>
          {description}
        </FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
}