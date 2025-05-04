import type { Term } from "@/types/deal";
import { Info } from "lucide-react";

interface TermListProps {
  terms: Term[];
}

export function TermList({ terms }: TermListProps) {
  // Sort terms by order if necessary, assuming they might not be pre-sorted
  const sortedTerms = [...terms].sort((a, b) => a.order - b.order);

  return (
    <ul className="space-y-1 text-xs text-muted-foreground"> {/* Adjusted base text style */}
      {sortedTerms.map((term) => (
        <li key={term.id} className="flex items-start space-x-2">
          <Info className="h-3.5 w-3.5 text-muted-foreground/80 mt-0.5 flex-shrink-0" /> {/* Slightly muted icon */}
          <span>{term.term}</span>
        </li>
      ))}
    </ul>
  );
}
