"use client";

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { DbAutoFieldProps } from "../DbAutoField";
import { Input } from "@/components/ui/input";
import { useFieldControl } from "../useFieldControl";

export type FieldInputStringProps = DbAutoFieldProps;

export function FieldInputString({ fieldControl }: FieldInputStringProps) {
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