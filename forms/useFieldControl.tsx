"use client";

import { DbAutoFieldProps } from "./DbAutoField";

export type UseFieldControlProps = DbAutoFieldProps;

export function useFieldControl({ fieldControl }: UseFieldControlProps) {
	return {
		label: <Label fieldControl={fieldControl} />,
		name: fieldControl.dbField.fieldName,
		description: null
	}
}

function Label({ fieldControl }: DbAutoFieldProps) {
	return <span>
		{fieldControl.dbField.fieldName}
		{fieldControl.dbField.accessType == "require" ?
			<span style={{ color: "red" }}> *</span> :
			null
		}
	</span>
}
