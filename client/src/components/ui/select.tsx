import * as React from "react"
import { cn } from "@/lib/utils"

const SelectContext = React.createContext<{
  value?: string
  onValueChange?: (value: string) => void
  isOpen?: boolean
  setIsOpen?: (open: boolean) => void
}>({})

export interface SelectProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
}

const Select = ({ value, defaultValue, onValueChange, children }: SelectProps) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue || value)
  const [isOpen, setIsOpen] = React.useState(false)
  const currentValue = value !== undefined ? value : internalValue

  const handleChange = (newValue: string) => {
    if (value === undefined) {
      setInternalValue(newValue)
    }
    onValueChange?.(newValue)
    setIsOpen(false)
  }

  return (
    <SelectContext.Provider value={{ value: currentValue, onValueChange: handleChange, isOpen, setIsOpen }}>
      <div className="relative">
        {children}
      </div>
    </SelectContext.Provider>
  )
}

const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }
>(({ className, children, ...props }, ref) => {
  const { isOpen, setIsOpen } = React.useContext(SelectContext)

  return (
    <>
      <button
        type="button"
        ref={ref}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        onClick={() => setIsOpen?.(!isOpen)}
        {...props}
      >
        {children}
        <span className="ml-2">▼</span>
      </button>
    </>
  )
})
SelectTrigger.displayName = "SelectTrigger"

const SelectContent = ({ children }: { children?: React.ReactNode }) => {
  const { isOpen, setIsOpen } = React.useContext(SelectContext)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!isOpen) return
    
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen?.(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen, setIsOpen])

  if (!isOpen) return null

  return (
    <div
      ref={ref}
      className="absolute z-50 min-w-full w-full overflow-hidden rounded-lg border border-gray-200 bg-white text-foreground shadow-xl mt-1 top-full left-0 max-h-60 overflow-y-auto"
    >
      <div className="py-1">
        {children}
      </div>
    </div>
  )
}

const SelectValue = ({ placeholder }: { placeholder?: string }) => {
  const { value } = React.useContext(SelectContext)
  if (value) {
    return <span>{value}</span>
  }
  return <span className="text-muted-foreground">{placeholder}</span>
}

interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  children: React.ReactNode
}

const SelectItem = ({ value, children, ...props }: SelectItemProps) => {
  const { value: selectedValue, onValueChange } = React.useContext(SelectContext)
  const isSelected = selectedValue === value

  return (
    <div
      className={cn(
        "relative flex cursor-pointer select-none items-center px-4 py-3 text-sm outline-none transition-colors",
        isSelected 
          ? "bg-primary text-primary-foreground font-medium" 
          : "text-foreground hover:bg-gray-100"
      )}
      onClick={() => {
        onValueChange?.(value)
      }}
      {...props}
    >
      {isSelected && (
        <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      )}
      <span className={cn(!isSelected && "ml-6")}>{children}</span>
    </div>
  )
}

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem }