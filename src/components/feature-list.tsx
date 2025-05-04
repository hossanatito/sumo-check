"use client";

import type { PlanFeature } from "@/types/deal";
import { CheckCircle } from "lucide-react";

interface FeatureListProps {
  features: PlanFeature[];
}

// Basic sanitizer to remove script tags and event handlers
const sanitizeHtml = (htmlString: string): string => {
  // Remove script tags
  let sanitized = htmlString.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
  // Remove on... event handlers
  sanitized = sanitized.replace(/ on\w+="[^"]*"/g, "");
  sanitized = sanitized.replace(/ on\w+='[^']*'/g, "");
  return sanitized;
};

export function FeatureList({ features }: FeatureListProps) {
  return (
    <ul className="space-y-2">
      {features.map((feature) => (
        <li key={feature.id} className="flex items-start space-x-2">
          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
          {/* Use dangerouslySetInnerHTML after basic sanitization */}
          <span dangerouslySetInnerHTML={{ __html: sanitizeHtml(feature.feature) }} />
        </li>
      ))}
    </ul>
  );
}
