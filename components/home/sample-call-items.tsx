import { Icon } from "@/components/ui/icon";
import type { Solution } from "@/lib/content/types";
import type { SampleCallItem } from "./sample-calls";

/**
 * Builds `SampleCallGroup` items on the server. The icon is rendered here and passed down as an
 * element, so the client bundle never needs the icon registry.
 */
export function toSampleCallItems(solutions: readonly Solution[]): SampleCallItem[] {
  return solutions.map((solution) => ({
    call: solution.sampleCall,
    icon: <Icon name={solution.icon} className="size-5.5" />,
  }));
}
