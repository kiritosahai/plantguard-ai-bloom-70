
import * as React from "react"
import { toast as sonnerToast, useToast as useSonnerToast } from "sonner"

// A wrapper around sonner's toast function to provide a more consistent API.
export const toast = ({ title, description, ...props }) => {
  return sonnerToast[props.variant || "default"](
    title,
    {
      description,
      ...props,
    }
  )
}

// A wrapper around sonner's useToast hook.
export const useToast = () => {
  // Get the original dismiss function
  const { dismiss } = useSonnerToast()
  
  // Create a proxy to handle toasts state and methods
  return React.useMemo(
    () => ({
      // For compatibility with existing code
      toast,
      dismiss,
      // For compatibility with shadcn's toast
      toasts: []
    }),
    [dismiss]
  )
}
