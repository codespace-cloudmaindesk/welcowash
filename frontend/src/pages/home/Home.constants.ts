import { Droplets, Map, CarTaxiFront } from 'lucide-react';

export const STATS = [
  {
    id: 'washes',
    icon: Droplets,
    label: 'Washes Completed',
    targetValue: 1.2,
    suffix: 'M+',
    precision: 1,
  },
  {
    id: 'cities',
    icon: Map,
    label: 'Cities Covered',
    targetValue: 50,
    suffix: '+',
    precision: 0,
  },
  {
    id: 'satisfaction',
    icon: CarTaxiFront,
    label: 'Customer Satisfaction',
    targetValue: 98,
    suffix: '%',
    precision: 0,
  },
] as const;
