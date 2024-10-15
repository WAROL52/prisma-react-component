"use client";

import { z } from "zod";
import { DbAutoFieldProps } from "./DbAutoField";
import { UseFormReturn, useForm } from "react-hook-form";
import { PrismaModelName, prismaEnumType } from "../types/generated/prismaSchema";
import { PrismaField, PrismaModel } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";

export type UseFormControlProps = {
	modelName: PrismaModelName
	dbModel: PrismaModel
	defaultValues?: Record<string, any>
};

export type FieldControl = {
	zodType: z.ZodTypeAny
	dbModel: PrismaModel
	dbField: PrismaField
	form: UseFormReturn
}

export type FormControl = {
	fieldControls: FieldControl[]
	form: UseFormReturn
}

export function useFormControl({ dbModel, modelName, defaultValues }: UseFormControlProps): FormControl {
	const shape: z.ZodRawShape = {}
	const zodtype = z.object(genZodType(dbModel, shape))
	const form = useForm({
		resolver: zodResolver(zodtype),
		mode: "onChange",
		defaultValues
	});
	return {
		form,
		fieldControls: dbModel.fields.map(dbField => {
			return {
				dbField,
				dbModel,
				form,
				zodType: shape[dbField.fieldName]
			}
		})
	}
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
