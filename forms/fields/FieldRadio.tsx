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
import { prismaEnumType } from "@/prisma-react-component/types/generated/prismaSchema";
import { PrismaFieldEnum } from "@/prisma-react-component/types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export type FieldRadioProps = DbAutoFieldProps & {
	dbField: PrismaFieldEnum
};

export function FieldRadio({ fieldControl, dbField }: FieldRadioProps) {
	const { dbModel, form } = fieldControl
	const { label, name, description } = useFieldControl({ fieldControl })
	const enumValues = prismaEnumType[dbField.originalType]
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem className="space-y-2 ">
					<FormLabel>{label}</FormLabel>
					<FormDescription>{description}</FormDescription>
					<FormControl>
						<RadioGroup
							onValueChange={field.onChange}
							defaultValue={field.value}
							className="flex flex-col space-y-1"
						>
							{
								enumValues.map(enumValue => {
									return <FormItem key={enumValue} className="flex items-center space-x-3 space-y-0">
										<FormControl>
											<RadioGroupItem value={enumValue} />
										</FormControl>
										<FormLabel className="font-normal">
											{enumValue}
										</FormLabel>
									</FormItem>
								})
							}
						</RadioGroup>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
