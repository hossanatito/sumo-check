export interface Deal {
  "Deal Title": string;
  Subheader: string;
  "Vendor Email": string;
  Image1: string;
  Plans: Plan[];
}

export interface Plan {
  id: number;
  plan_type: string;
  is_active: boolean;
  tier: number;
  is_plus_tier: boolean;
  highlight: boolean;
  interval: null | string;
  interval_count: null | number;
  price: string;
  original_price: string;
  terms: Term[];
  plan_features: PlanFeature[];
  codes: number;
  public_name: string;
  plan_desc: string;
  is_free: boolean;
  links: Links;
}

export interface Term {
  id: number;
  created: string;
  modified: string;
  deal_id: number;
  term: string;
  is_active: boolean;
  order: number;
}

export interface PlanFeature {
  id: number;
  feature: string;
}

export interface Links {
  deal: string;
}
