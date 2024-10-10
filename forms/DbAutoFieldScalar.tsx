"use client";

import { Input } from "@/components/ui/input";
import { PrismaFieldScalar, prismaScalarTypes } from "../types";
import { DbAutoFieldProps } from "./DbAutoField";
import { DbAutoFieldBase, DbAutoFieldComponentProps } from "./DbAutoFieldBase";
import { DatePicker } from "@/components/ui/date-picker";
import { FormField } from "@/components/ui/form";
import { useState } from "react";

export type DbAutoFieldScalarProps = DbAutoFieldProps&{
    field:PrismaFieldScalar
}

export function DbAutoFieldScalar(props: DbAutoFieldScalarProps) {
    const {field}=props
    if (!prismaScalarTypes.includes(field.originalType)) {
        return null
    }
    return <DbAutoFieldBase {...props} FieldComponent={DbField} />
}

function DbField(props:DbAutoFieldComponentProps) {
    const {dbField,field,fieldState,formState}=props
    if (dbField.field.originalType === "Int")
            return <DbFieldInt {...props} />
    if (dbField.field.originalType === "BigInt")
        return <DbFieldBigInt {...props} />
    if (dbField.field.originalType === "Boolean")
        return <DbFieldBoolean {...props} />
    if (dbField.field.originalType === "Bytes")
        return <DbFieldBytes {...props} />
    if (dbField.field.originalType === "DateTime")
        return <DbFieldDateTime {...props} />
    if (dbField.field.originalType === "Decimal")
        return <DbFieldDecimal {...props} />
    if (dbField.field.originalType === "Float")
        return <DbFieldFloat {...props} />
    if (dbField.field.originalType === "Json")
        return <DbFieldJson {...props} />
    if (dbField.field.originalType === "String")
        return <DbFieldString {...props} />
    if (dbField.field.originalType === "Unsupported")
        return <DbFieldUnsupported {...props} />
    return null
}

function DbFieldInt(props:DbAutoFieldComponentProps) {
    const {dbField,field,fieldState,formState}=props
    if (dbField.field.originalType != "Int") {
        return null
    }
    return <Input
        type="number"
        {...field}
    />
}
function DbFieldBigInt(props:DbAutoFieldComponentProps) {
    const {dbField,field,fieldState,formState}=props
    if (dbField.field.originalType != "BigInt") {
        return null
    }
    return <Input
        id={field.name}
        type="number"
        {...field}
    />
}
function DbFieldFloat(props:DbAutoFieldComponentProps) {
    const {dbField,field,fieldState,formState}=props
    if (dbField.field.originalType != "Float") {
        return null
    }
    return <Input
        id={field.name}
        type="text"
        placeholder="Enter your name"
        {...dbField.form.register("name")}
        {...field}
    />
}
function DbFieldDecimal(props:DbAutoFieldComponentProps) {
    const {dbField,field,fieldState,formState}=props
    if (dbField.field.originalType != "Decimal") {
        return null
    }
    return <Input
        id={field.name}
        type="number"
        {...field}
    />
}
function DbFieldString(props:DbAutoFieldComponentProps) {
    const {dbField,field,fieldState,formState}=props
    if (dbField.field.originalType != "String") {
        return null
    }
    return <Input
        id={field.name}
        type="text"
        placeholder="Enter your name"
        {...dbField.form.register("name")}
        {...field}
    />
}
function DbFieldBoolean(props:DbAutoFieldComponentProps) {
    const {dbField,field,fieldState,formState}=props
    if (dbField.field.originalType != "Boolean") {
        return null
    }
    return <Input
        id={field.name}
        type="text"
        placeholder="Enter your name"
        {...dbField.form.register("name")}
        {...field}
    />
}
function DbFieldDateTime(props:DbAutoFieldComponentProps) {
    const {dbField,field,fieldState,formState}=props
    if (dbField.field.originalType != "DateTime") {
        return null
    }
    return <DatePicker
    setDate={()=>{}}
        {...field}
    />
}
function DbFieldJson(props:DbAutoFieldComponentProps) {
    const {dbField,field,fieldState,formState}=props
    if (dbField.field.originalType != "Json") {
        return null
    }
    return <Input
        id={field.name}
        type="text"
        placeholder="Enter your name"
        {...dbField.form.register("name")}
        {...field}
    />
}
function DbFieldBytes(props:DbAutoFieldComponentProps) {
    const {dbField,field,fieldState,formState}=props
    if (dbField.field.originalType != "Bytes") {
        return null
    }
    return <Input
        id={field.name}
        type="text"
        placeholder="Enter your name"
        {...dbField.form.register("name")}
        {...field}
    />
}
function DbFieldUnsupported(props:DbAutoFieldComponentProps) {
    const {dbField,field,fieldState,formState}=props
    if (dbField.field.originalType != "Unsupported") {
        return null
    }
    return <Input
        id={field.name}
        type="number"
        placeholder="Enter your name"
        {...dbField.form.register("name")}
        {...field}
    />
}