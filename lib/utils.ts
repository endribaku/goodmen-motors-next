import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Translate fuel types to Albanian
export function translateFuelType(fuelType: string): string {
  const fuelMap: Record<string, string> = {
    petrol: 'Benzinë',
    diesel: 'Naftë',
    hybrid: 'Hibrid',
    electric: 'Elektrik',
    other: 'Tjetër',
  };
  return fuelMap[fuelType.toLowerCase()] || fuelType;
}

