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
    const { dbField } = props.fieldControl
    if (props.fieldControl.dbField.originalType === "Int")
        return <FieldNumber {...props} />
    if (dbField.originalType === "BigInt")
        return <FieldNumber {...props} />
    if (dbField.originalType === "Boolean")
        return <FieldCheckbox {...props} />
    if (dbField.originalType === "Bytes")
        return <FieldInputString {...props} />
    if (dbField.originalType === "DateTime")
        return <FieldDatePicker {...props} />
    if (dbField.originalType === "Decimal")
        return <FieldNumber {...props} />
    if (dbField.originalType === "Float")
        return <FieldNumber {...props} />
    if (dbField.originalType === "Json")
        return <FieldInputString {...props} />
    if (dbField.originalType === "String")
        return <FieldInputString {...props} />
    if (dbField.originalType === "Unsupported")
        return <FieldInputString {...props} />
    return null
}
