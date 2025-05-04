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
import { Separator } from "@/components/ui/separator";
import { FeatureList } from "./feature-list";
import { TermList } from "./term-list";
import { DollarSign, Tag } from "lucide-react";

interface PlanCardProps {
  plan: Plan;
}

export function PlanCard({ plan }: PlanCardProps) {
  return (
    <Card className="flex flex-col transition-shadow duration-300 hover:shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-start gap-2">
          <div>
             <CardTitle className="text-xl font-semibold">{plan.public_name}</CardTitle>
            <CardDescription className="text-sm">{plan.plan_desc}</CardDescription>
          </div>
          {plan.highlight && <Badge variant="secondary">Highlight</Badge>}
           {plan.is_plus_tier && <Badge variant="outline">Plus Tier</Badge>}
        </div>
        <div className="flex items-baseline space-x-2 pt-2">
           <DollarSign className="h-6 w-6 text-primary" />
           <span className="text-3xl font-bold text-primary">${plan.price}</span>
           {plan.original_price && plan.original_price !== "0.00" && (
            <span className="text-sm text-muted-foreground line-through">
              ${plan.original_price}
            </span>
          )}
        </div>
         <Badge variant="outline" className="w-fit mt-1">
            <Tag className="h-3 w-3 mr-1" /> {plan.plan_type} - {plan.codes} Code{plan.codes !== 1 ? 's' : ''}
        </Badge>

      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div>
          <h4 className="text-md font-medium mb-2">Features:</h4>
          <FeatureList features={plan.plan_features} />
        </div>

      </CardContent>
       <CardFooter className="flex flex-col items-start pt-4 border-t">
         <h4 className="text-md font-medium mb-2">Terms:</h4>
         <TermList terms={plan.terms} />
       </CardFooter>
    </Card>
  );
}
