"use client";

import { DbAutoFieldProps } from "../DbAutoField";

export type UseFieldControlProps = DbAutoFieldProps;

export function useFieldControl(props: UseFieldControlProps) {
	return {
		label: <Label {...props} />,
		name: props.dbField.fieldName,
		description: null
	}
}

function Label({ dbField }: DbAutoFieldProps) {
	return <span>
		{dbField.fieldName}
		{dbField.accessType == "require" ?
			<span style={{ color: "red" }}> *</span> :
			null
		}
	</span>
}