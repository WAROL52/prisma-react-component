"use client";

import { Input } from "@/components/ui/input";
import { PrismaFieldScalar, prismaScalarTypes } from "../types";
import { DbAutoFieldProps } from "./DbAutoField";
import { FieldCheckbox } from "./fields/FieldCheckbox";
import { FieldDatePicker } from "./fields/FieldDatePicker";
import { FieldInputString } from "./fields/FieldInputString";
import { FieldNumber } from "./fields/FieldNumber";

export type DbAutoFieldScalarProps = DbAutoFieldProps & {
    dbField: PrismaFieldScalar
}

export function DbAutoFieldScalar(props: DbAutoFieldScalarProps) {
    const { dbField } = props
    if (!prismaScalarTypes.includes(dbField.originalType)) {
        return null
    }
    return <DbField  {...props} />
}

function DbField(props: DbAutoFieldProps) {
    if (props.dbField.originalType === "Int")
        return <FieldNumber {...props} />
    if (props.dbField.originalType === "BigInt")
        return <FieldNumber {...props} />
    if (props.dbField.originalType === "Boolean")
        return <FieldCheckbox {...props} />
    if (props.dbField.originalType === "Bytes")
        return <FieldInputString {...props} />
    if (props.dbField.originalType === "DateTime")
        return <FieldDatePicker {...props} />
    if (props.dbField.originalType === "Decimal")
        return <FieldNumber {...props} />
    if (props.dbField.originalType === "Float")
        return <FieldNumber {...props} />
    if (props.dbField.originalType === "Json")
        return <FieldInputString {...props} />
    if (props.dbField.originalType === "String")
        return <FieldInputString {...props} />
    if (props.dbField.originalType === "Unsupported")
        return <FieldInputString {...props} />
    return null
}
