import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  format,
  formatDistance,
  formatRelative,
  differenceInDays,
  parseISO,
} from "date-fns";
import { es } from "date-fns/locale";

// Function to merge Class Names in Tailwind and React
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Functions to format dates
export function df(
  dateString: string,
  withTime = false,
  limitDistance = 7,
): string {
  const date = parseISO(dateString);

  if (!date) return "Fecha invalida";

  const diffDays = differenceInDays(new Date(), date);
  const result =
    diffDays >= limitDistance
      ? withTime
        ? dateTimeShort(date)
        : dateShort(date)
      : dateDistance(date, new Date());

  //console.log(`dateLocalFormat: ${result}`);
  return result;
}

export function dateShort(date: Date): string {
  if (!date) {
    throw new Error("Invalid date provided.");
  }

  const result = format(date, "P", { locale: es });

  //console.log(`dateFormatPattern: ${result}`);
  return result;
}

export function dateTimeShort(date: Date): string {
  if (!date) {
    throw new Error("Invalid date provided.");
  }

  const result = format(date, "P p", { locale: es });

  //console.log(`dateFormatPattern: ${result}`);
  return result;
}

export function dateDistance(date: Date, to: Date): string {
  if (!date) {
    throw new Error("Invalid date provided.");
  }

  const result = formatDistance(date, to, { locale: es, addSuffix: true });

  //console.log(`dateFormatDistance: ${result}`);
  return result;
}

export function dateRelative(date: Date, baseDate: Date): string {
  if (!date) {
    throw new Error("Invalid date provided.");
  }

  const result = formatRelative(date, baseDate, { locale: es });

  //console.log(`dateFormatRelative: ${result}`);
  return result;
}
