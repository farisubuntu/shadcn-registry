import * as React from "react";
import { DivideIcon as LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

type IconType = typeof LucideIcon;

// Define the shape of server action response
interface ActionResponse<T> {
 data?: T;
 error?: string;
}

// Define the props for our smart button

export interface ActionButtonProps<T> extends Omit<ButtonProps, "onClick"> {
 action: () => Promise<ActionResponse<T>>;
 icon?: IconType;
 onSuccess?: (data: T) => void;
 onError?: (error: string | any) => void;
 loadingText?: string;
}

export function ActionButton<T>({
 action,
 onSuccess,
 onError,
 loadingText,
 icon: Icon,
 ...props
}: ActionButtonProps<T>) {
 const [isLoading, setIsLoading] = React.useState(false);

 const handleClick = async () => {
  try {
   setIsLoading(true);
   const response = await action();
   if (response.error) {
    onError?.(response.error);
   }
   if (response.data) {
    onSuccess?.(response.data);
   }

   setIsLoading(false);
  } catch (error) {
   onError?.(error instanceof Error ? error.message : error);
  } finally {
   setIsLoading(false);
  }
 };

 return (
  <Button onClick={handleClick} disabled={isLoading} {...props}>
   {isLoading ? (
    <>
     <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
     {loadingText || "Loading..."}
    </>
   ) : (
    <>
     {Icon && <Icon className="mr-2 h-4 w-4" />}
     {props.children}
    </>
   )}
  </Button>
 );
}
