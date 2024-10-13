"use client";

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { DbAutoFieldProps } from "../DbAutoField";
import { Input } from "@/components/ui/input";
import { useFieldControl } from "./useFieldControl";

export type FieldNumberProps = DbAutoFieldProps;

export function FieldNumber({ dbField, dbModel, form }: FieldNumberProps) {
	const { label, name, description } = useFieldControl({ dbField, dbModel, form })
	return <FormField
		control={form.control}
		name={name}
		render={({ field }) => (
			<FormItem>
				<FormLabel>{label}</FormLabel>
				<FormControl>
					<Input
						{...field}
						type="number"
						onChange={(e) => field.onChange(Number(e.target.value))} />
				</FormControl>
				<FormDescription >
					{description}
				</FormDescription>
				<FormMessage />
			</FormItem>
		)}
	/>
}
