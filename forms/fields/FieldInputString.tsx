"use client";

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { DbAutoFieldProps } from "../DbAutoField";
import { Input } from "@/components/ui/input";
import { useFieldControl } from "./useFieldControl";

export type FieldInputStringProps = DbAutoFieldProps;

export function FieldInputString({ dbField, dbModel, form }: FieldInputStringProps) {
	const { label, name, description } = useFieldControl({ dbField, dbModel, form })
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