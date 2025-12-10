import * as React from "react"
import { Controller, UseFormReturn } from "react-hook-form"
import { cn } from "@/lib/utils"

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form?: UseFormReturn<any>
}

const Form = ({ children, form, ...props }: FormProps) => {
  return <form {...props}>{children}</form>
}

interface FormFieldProps {
  control: any
  name: string
  render: (props: { field: any; fieldState?: any }) => React.ReactNode
}

const FormField = ({ control, name, render }: FormFieldProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <>
          {render({ field, fieldState })}
        </>
      )}
    />
  )
}

const FormItem = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("space-y-2", className)} {...props} />
)

const FormLabel = ({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)} {...props} />
)

const FormControl = ({ ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...props} />
)

interface FormMessageProps {
  fieldState?: { error?: { message?: string } }
}

const FormMessage = ({ fieldState }: FormMessageProps) => {
  if (!fieldState?.error) return null
  return (
    <p className="text-sm font-medium text-red-500 mt-1">
      {fieldState.error?.message}
    </p>
  )
}

export { Form, FormField, FormItem, FormLabel, FormControl, FormMessage }
