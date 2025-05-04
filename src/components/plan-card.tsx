import type { Plan } from "@/types/deal";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FeatureList } from "./feature-list";
import { TermList } from "./term-list";
import { DollarSign, Tag, Check, Star } from "lucide-react"; // Added Check, Star

interface PlanCardProps {
  plan: Plan;
}

export function PlanCard({ plan }: PlanCardProps) {
  return (
    <Card className="flex flex-col transition-shadow duration-300 hover:shadow-xl bg-card border border-border/50 rounded-lg overflow-hidden">
      <CardHeader className="bg-muted/20 p-4 border-b border-border/50"> {/* Slightly different header bg */}
        <div className="flex justify-between items-start gap-2 mb-2">
          <div>
             <CardTitle className="text-lg font-semibold text-foreground">{plan.public_name}</CardTitle>
            {plan.plan_desc && <CardDescription className="text-xs text-muted-foreground mt-1">{plan.plan_desc}</CardDescription>}
          </div>
          <div className="flex flex-col items-end gap-1">
             {plan.highlight && <Badge variant="secondary" className="flex items-center gap-1 text-xs"><Star className="w-3 h-3"/> Highlight</Badge>}
             {plan.is_plus_tier && <Badge variant="outline" className="text-xs border-primary/50 text-primary">Plus Tier</Badge>}
           </div>
        </div>
        <div className="flex items-baseline space-x-1 pt-1">
           <DollarSign className="h-5 w-5 text-primary" />
           <span className="text-2xl font-bold text-primary">${plan.price}</span>
           {plan.original_price && plan.original_price !== "0.00" && (
            <span className="text-xs text-muted-foreground line-through">
              ${plan.original_price}
            </span>
          )}
        </div>
         <Badge variant="outline" className="w-fit mt-2 text-xs border-border/60">
            <Tag className="h-3 w-3 mr-1" /> {plan.plan_type} - {plan.codes} Code{plan.codes !== 1 ? 's' : ''}
        </Badge>

      </CardHeader>
      <CardContent className="flex-grow space-y-4 p-4">
        <div>
          <h4 className="text-sm font-medium mb-2 text-foreground/90">Features:</h4>
          <FeatureList features={plan.plan_features} />
        </div>

      </CardContent>
       {plan.terms && plan.terms.length > 0 && (
         <CardFooter className="flex flex-col items-start p-4 border-t border-border/50 bg-muted/10">
           <h4 className="text-sm font-medium mb-2 text-foreground/90">Terms:</h4>
           <TermList terms={plan.terms} />
         </CardFooter>
       )}
    </Card>
  );
}
