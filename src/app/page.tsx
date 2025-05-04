"use client";

import { useState } from 'react';
import { DealForm } from '@/components/deal-form';
import { DealDisplay } from '@/components/deal-display';
import type { Deal } from '@/types/deal';
import { Skeleton } from '@/components/ui/skeleton';
import { PackageSearch } from 'lucide-react';


export default function Home() {
  const [dealData, setDealData] = useState<Deal[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-12 lg:p-24 bg-background">
       <div className="text-center mb-12 w-full max-w-2xl">
          <div className="flex items-center justify-center gap-3 mb-4">
             <PackageSearch className="h-10 w-10 text-primary"/>
             <h1 className="text-4xl font-bold tracking-tight text-foreground">
                Sumo Check
             </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
             Enter an AppSumo deal URL below to quickly fetch and review its details, plans, and terms.
          </p>
       </div>

      <DealForm setDealData={setDealData} setIsLoading={setIsLoading} />

       <div className="w-full mt-12 max-w-5xl mx-auto">
        {isLoading && (
            <div className="w-full mt-6 space-y-6">
                 <Skeleton className="h-[200px] w-full rounded-lg bg-muted/40" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Skeleton className="h-[300px] w-full rounded-lg bg-muted/40" />
                    <Skeleton className="h-[300px] w-full rounded-lg bg-muted/40" />
                    <Skeleton className="h-[300px] w-full rounded-lg bg-muted/40" />
                </div>
            </div>
        )}
         {!isLoading && dealData && dealData.length > 0 && (
            <DealDisplay deal={dealData[0]} />
          )}
         {!isLoading && dealData && dealData.length === 0 && (
           <div className="text-center mt-12 text-muted-foreground">
             <p>No deal information found for the provided URL.</p>
           </div>
         )}
      </div>
    </main>
  );
}
