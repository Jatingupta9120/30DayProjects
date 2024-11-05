import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Change from default export to named export
 export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
}

export {cn as default};