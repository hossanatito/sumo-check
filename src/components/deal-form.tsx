"use client";

import { useActionState, useEffect } from "react"; // Import useActionState from React
import { useFormStatus } from "react-dom";
import { fetchDealInfo } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, Loader2, Search } from "lucide-react";
import type { Deal } from "@/types/deal";
import { useToast } from "@/hooks/use-toast";


interface DealFormProps {
  setDealData: (data: Deal[] | null) => void;
  setIsLoading: (loading: boolean) => void;
}


function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" aria-disabled={pending} disabled={pending} className="bg-[#7ade9b] hover:bg-[#54d67e] text-black rounded-none">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin text-black" />
          Checking...
        </>
      ) : (
        <>
          <Search className="mr-2 h-4 w-4 text-black" />
          Check Deal
        </>
      )}
    </Button>
  );
}


export function DealForm({ setDealData, setIsLoading }: DealFormProps) {
   const initialState = { success: false, error: undefined, data: undefined };
   const [state, formAction] = useActionState(fetchDealInfo, initialState);
   const { pending } = useFormStatus();
   const { toast } = useToast();

    useEffect(() => {
        setIsLoading(pending);
        if (!pending && state) {
             if (state.success && state.data) {
                setDealData(state.data);
                toast({
                  title: "Success!",
                  description: "Deal information loaded.",
                });
             } else if (state.error) {
                setDealData(null); // Clear previous data on error
                toast({
                  variant: "destructive",
                  title: "Error",
                  description: state.error,
                });
             }
         }
    // Only run effect when state changes or pending status changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state, pending]);

  return (
    <form action={formAction} className="space-y-4 w-full max-w-xl items-center">
      <div className="space-y-2">
        <Label htmlFor="url" className="text-foreground/90">AppSumo Deal URL</Label>
        <Input
          id="url"
          name="url"
          type="url"
          placeholder="https://appsumo.com/products/your-deal/"
          required
          className="text-base bg-input border-border focus:ring-primary" // Dark theme input styles
        />
      </div>
       {state?.error && !pending && (
         <Alert variant="destructive" className="bg-destructive/10 border-destructive/50 text-destructive">
           <Terminal className="h-4 w-4 text-destructive" />
           <AlertTitle>Error</AlertTitle>
           <AlertDescription>{state.error}</AlertDescription>
         </Alert>
       )}
       <div className="flex justify-center">
           <SubmitButton />
       </div>
    </form>
  );
}
