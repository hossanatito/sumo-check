"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Search } from "lucide-react";
import type { Deal } from "@/types/deal";


interface DealFormProps {
  setDealData: (data: Deal[] | null) => void;
  setIsLoading: (loading: boolean) => void;
}

export function DealForm({ setDealData, setIsLoading }: DealFormProps) {
   const [isDialogOpen, setIsDialogOpen] = useState(false);

   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault(); // Prevent form submission
     setIsDialogOpen(true); // Show the V2 notification dialog
   };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-xl items-center glass-strong p-8 rounded-2xl glow-border">
        <div className="space-y-2">
          <Label htmlFor="url" className="text-foreground/90">AppSumo Deal URL</Label>
          <Input
            id="url"
            name="url"
            type="url"
            placeholder="https://appsumo.com/products/your-deal/"
            required
            className="text-base bg-input border-border focus:ring-primary" // Dark theme input styles
            disabled
          />
        </div>
        <div className="flex justify-center">
          <Button type="submit" className="bg-[#7ade9b] hover:bg-[#54d67e] text-black rounded-none">
            <Search className="mr-2 h-4 w-4 text-black" />
            Version 2 Active - Click Here to Access
          </Button>
        </div>
      </form>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl">V2 of SumoCheck is Now Available!</AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              We've launched a new and improved version of SumoCheck with better features and performance.
              Visit the new version to continue checking AppSumo deals.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction asChild>
              <a
                href="https://sumocheck.appsdyno.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                Go to V2
              </a>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
