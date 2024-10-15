"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DbAutoFieldProps } from "../DbAutoField";
import { ReactNode } from "react";
import { useFieldControl } from "../useFieldControl";

export type FieldCheckboxProps = DbAutoFieldProps;

export function FieldCheckbox({ fieldControl }: FieldCheckboxProps) {
	const { dbField, dbModel, form } = fieldControl
	const { label, name, description } = useFieldControl({ fieldControl })
	return (
		<FormField
			control={form.control}
			defaultValue={false}
			name={name}
			render={({ field }) => (
				<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
					<FormControl>
						<Checkbox checked={field.value} onCheckedChange={field.onChange} />
					</FormControl>
					<div className="space-y-1 leading-none">
						<FormLabel>{label}</FormLabel>
						<FormDescription>{description}</FormDescription>
						<FormMessage />
					</div>
				</FormItem>
			)}
		/>
	);
}

export type FieldCheckboxMultipleProps = FieldCheckboxProps & {
	items: {
		id: string;
		label: ReactNode;
		value: string;
	}[];
};
export function FieldCheckboxMultiple({ fieldControl, items }: FieldCheckboxMultipleProps) {
	const { dbField, dbModel, form } = fieldControl
	const { label, name, description } = useFieldControl({ fieldControl })
	return (
		<FormField
			control={form.control}
			name="items"
			render={() => (
				<FormItem>
					<div className="mb-4">
						<FormLabel className="text-base">
							{dbField.fieldName}
						</FormLabel>
						<FormDescription>
							{null}
						</FormDescription>
						<FormMessage />
					</div>
					{items.map((item) => (
						<FormField
							key={item.id}
							control={form.control}
							name="items"
							render={({ field }) => {
								return (
									<FormItem
										key={item.id}
										className="flex flex-row items-start space-x-3 space-y-0"
									>
										<FormControl>
											<Checkbox
												checked={field.value?.includes(item.id)}
												onCheckedChange={(checked) => {
													return checked
														? field.onChange([...field.value, item.id])
														: field.onChange(
															field.value?.filter(
																(value: string) => value !== item.id
															)
														);
												}}
											/>
										</FormControl>
										<FormLabel className="text-sm font-normal">
											{item.label}
										</FormLabel>
									</FormItem>
								);
							}}
						/>
					))}
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
