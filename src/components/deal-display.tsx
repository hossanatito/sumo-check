import type { Deal } from "@/types/deal";
import Image from "next/image";
import { PlanCard } from "./plan-card";
import { Mail, Image as ImageIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";


interface DealDisplayProps {
  deal: Deal;
}

export function DealDisplay({ deal }: DealDisplayProps) {
  return (
    <Card className="w-full max-w-5xl mx-auto overflow-hidden mt-6 glass-strong glow-border shadow-2xl">
      <CardHeader className="bg-gradient-to-br from-primary/10 to-transparent p-6 border-b border-border/50"> {/* Subtle header background */}
         <div className="flex flex-col md:flex-row items-start gap-4">
          {deal.Image1 ? (
            <Image
              src={deal.Image1}
              alt={`${deal["Deal Title"]} image`}
              width={100}
              height={100}
              className="rounded-md border border-border/50 object-cover aspect-square flex-shrink-0"
              data-ai-hint="product logo brand"
            />
          ) : (
             <div className="w-[100px] h-[100px] bg-secondary rounded-md flex items-center justify-center flex-shrink-0 border border-border/50">
                <ImageIcon className="w-10 h-10 text-muted-foreground" />
             </div>
          )}
          <div className="flex-grow">
             <CardTitle className="text-2xl font-bold mb-1 text-foreground">{deal["Deal Title"]}</CardTitle>
             <CardDescription className="text-lg text-muted-foreground mb-3">{deal.Subheader}</CardDescription>
             <div className="flex items-center text-sm text-muted-foreground">
                <Mail className="h-4 w-4 mr-2"/>
                <span>Vendor Email: {deal["Vendor Email"]}</span>
             </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-4 text-foreground">Available Plans</h3>
         {deal.Plans && deal.Plans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deal.Plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No plans available for this deal.</p>
        )}
      </CardContent>
    </Card>
  );
}
