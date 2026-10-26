export interface LanguageOption {
  value: string;
  label: string;
}

/**
 * Languages shown on the Multilingual Voice page and offered in call-me forms.
 *
 * TODO(content): the brand SOP requires listing only the languages you have
 * tested end to end ("List the exact languages you have tested before
 * publishing"). English, Hindi and Hinglish are placeholders based on the SOP's
 * own Hinglish example. Edit this list to match your test results.
 */
export const testedLanguages: LanguageOption[] = [
  { value: "english", label: "English" },
  { value: "hindi", label: "Hindi" },
  { value: "hinglish", label: "Hinglish (Hindi + English)" },
];

/** What the forms offer: tested languages, plus a way to ask for another. */
export const languageOptions: LanguageOption[] = [
  ...testedLanguages,
  { value: "other", label: "Another language (tell us)" },
];

export const DEFAULT_LANGUAGE = "english";
