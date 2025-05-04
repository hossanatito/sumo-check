import type { Term } from "@/types/deal";
import { Info } from "lucide-react";

interface TermListProps {
  terms: Term[];
}

export function TermList({ terms }: TermListProps) {
  // Sort terms by order if necessary, assuming they might not be pre-sorted
  const sortedTerms = [...terms].sort((a, b) => a.order - b.order);

  return (
    <ul className="space-y-1 text-sm text-muted-foreground">
      {sortedTerms.map((term) => (
        <li key={term.id} className="flex items-start space-x-2">
          <Info className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
          <span>{term.term}</span>
        </li>
      ))}
    </ul>
  );
}
