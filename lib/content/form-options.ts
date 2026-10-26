import type { SelectOption } from "@/components/ui/form-fields";
import { industries } from "./industries";

export const industryOptions: SelectOption[] = [
  ...industries.map((industry) => ({ value: industry.slug, label: industry.name })),
  { value: "other", label: "Other" },
];

export const teamSizeOptions: SelectOption[] = [
  { value: "1", label: "Just me" },
  { value: "2-10", label: "2 to 10 people" },
  { value: "11-50", label: "11 to 50 people" },
  { value: "51-200", label: "51 to 200 people" },
  { value: "201-1000", label: "201 to 1,000 people" },
  { value: "1000+", label: "More than 1,000" },
];

export const monthlyLeadOptions: SelectOption[] = [
  { value: "<100", label: "Fewer than 100" },
  { value: "100-500", label: "100 to 500" },
  { value: "500-2000", label: "500 to 2,000" },
  { value: "2000-10000", label: "2,000 to 10,000" },
  { value: ">10000", label: "More than 10,000" },
];

/** SOP §9.1 step 3: what the visitor wants from Reseny. */
export const goalOptions: SelectOption[] = [
  { value: "sales", label: "AI calling for sales" },
  { value: "appointments", label: "Appointment booking" },
  { value: "support", label: "Customer support" },
  { value: "collections", label: "Collections and reminders" },
  { value: "other", label: "Something else" },
];

export const contactTopicOptions: SelectOption[] = [
  { value: "sales", label: "Sales: pricing and demos" },
  { value: "support", label: "Support" },
  { value: "partnerships", label: "Partnerships and agencies" },
  { value: "other", label: "Something else" },
];
