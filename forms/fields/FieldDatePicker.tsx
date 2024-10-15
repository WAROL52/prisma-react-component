"use client";

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { DbAutoFieldProps } from "../DbAutoField";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useFieldControl } from "../useFieldControl";
export type FieldDatePickerProps = DbAutoFieldProps;

export function FieldDatePicker({ fieldControl }: FieldDatePickerProps) {
	const { dbField, dbModel, form } = fieldControl
	const { label, name, description } = useFieldControl({ fieldControl })
	return <FormField
		control={form.control}
		name={name}
		render={({ field }) => (
			<FormItem className="flex flex-col">
				<FormLabel>
					{label}
				</FormLabel>
				<Popover>
					<PopoverTrigger asChild>
						<FormControl>
							<Button
								variant={"outline"}
								className={cn(
									"w-[240px] pl-3 text-left font-normal",
									!field.value && "text-muted-foreground"
								)}
							>
								{field.value ? (
									format(field.value, "PPP")
								) : (
									<span>Pick a date</span>
								)}
								<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
							</Button>
						</FormControl>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0" align="start">
						<Calendar
							mode="single"
							selected={field.value}
							onSelect={field.onChange}
							disabled={(date) =>
								date > new Date() || date < new Date("1900-01-01")
							}
							initialFocus
						/>
					</PopoverContent>
				</Popover>
				<FormDescription>
					{description}
				</FormDescription>
				<FormMessage />
			</FormItem>
		)}
	/>
}