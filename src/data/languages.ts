// ISO 639-1 language codes with common languages
export const languages = [
  { code: "en", name: "English", dialects: ["American", "British", "Australian", "Canadian", "Irish", "Scottish", "South African", "Indian"] },
  { code: "es", name: "Spanish", dialects: ["Castilian (Spain)", "Mexican", "Argentine", "Colombian", "Chilean", "Peruvian", "Venezuelan", "Caribbean"] },
  { code: "fr", name: "French", dialects: ["Metropolitan French", "Canadian French", "Belgian French", "Swiss French", "African French"] },
  { code: "de", name: "German", dialects: ["Standard German", "Austrian German", "Swiss German", "Bavarian", "Low German"] },
  { code: "zh", name: "Chinese", dialects: ["Mandarin", "Cantonese", "Wu (Shanghainese)", "Min Nan (Taiwanese)", "Hakka"] },
  { code: "ar", name: "Arabic", dialects: ["Egyptian", "Levantine", "Gulf", "Maghrebi", "Iraqi", "Modern Standard Arabic"] },
  { code: "hi", name: "Hindi", dialects: ["Standard Hindi", "Khari Boli", "Braj Bhasha", "Awadhi", "Bhojpuri"] },
  { code: "pt", name: "Portuguese", dialects: ["European Portuguese", "Brazilian Portuguese", "African Portuguese", "Asian Portuguese"] },
  { code: "ru", name: "Russian", dialects: ["Central Russian", "Northern Russian", "Southern Russian"] },
  { code: "ja", name: "Japanese", dialects: ["Tokyo (Standard)", "Kansai", "Tohoku", "Kyushu", "Okinawan"] },
  { code: "ko", name: "Korean", dialects: ["Seoul (Standard)", "Pyongyang", "Gyeongsang", "Jeolla", "Jeju"] },
  { code: "it", name: "Italian", dialects: ["Tuscan (Standard)", "Roman", "Milanese", "Neapolitan", "Sicilian", "Venetian"] },
  { code: "tr", name: "Turkish", dialects: ["Istanbul Turkish", "Anatolian", "Rumelian"] },
  { code: "pl", name: "Polish", dialects: ["Greater Polish", "Lesser Polish", "Mazovian", "Silesian"] },
  { code: "uk", name: "Ukrainian", dialects: ["Northern", "Southwestern", "Southeastern"] },
  { code: "nl", name: "Dutch", dialects: ["Netherlandic Dutch", "Flemish", "Brabantian", "Limburgish"] },
  { code: "sv", name: "Swedish", dialects: ["Central Swedish", "Finland Swedish", "Scanian", "Gothenburg"] },
  { code: "vi", name: "Vietnamese", dialects: ["Northern", "Central", "Southern"] },
  { code: "th", name: "Thai", dialects: ["Central Thai", "Isan", "Northern Thai", "Southern Thai"] },
  { code: "id", name: "Indonesian", dialects: ["Standard Indonesian", "Javanese-influenced", "Betawi"] },
  { code: "he", name: "Hebrew", dialects: ["Modern Hebrew", "Sephardic", "Ashkenazi", "Yemenite"] },
  { code: "el", name: "Greek", dialects: ["Standard Modern Greek", "Cretan", "Cypriot"] },
  { code: "cs", name: "Czech", dialects: ["Bohemian", "Moravian", "Silesian"] },
  { code: "ro", name: "Romanian", dialects: ["Daco-Romanian", "Moldavian"] },
  { code: "hu", name: "Hungarian", dialects: ["Standard Hungarian", "Csángó", "Palóc"] },
  { code: "da", name: "Danish", dialects: ["Copenhagen Danish", "Jutlandic", "Insular Danish"] },
  { code: "fi", name: "Finnish", dialects: ["Standard Finnish", "Eastern Finnish", "Western Finnish"] },
  { code: "no", name: "Norwegian", dialects: ["Bokmål", "Nynorsk", "Riksmål"] },
  { code: "sk", name: "Slovak", dialects: ["Central Slovak", "Eastern Slovak", "Western Slovak"] },
  { code: "bg", name: "Bulgarian", dialects: ["Eastern Bulgarian", "Western Bulgarian"] },
  { code: "hr", name: "Croatian", dialects: ["Shtokavian", "Chakavian", "Kajkavian"] },
  { code: "ta", name: "Tamil", dialects: ["Chennai Tamil", "Madurai Tamil", "Sri Lankan Tamil"] },
  { code: "bn", name: "Bengali", dialects: ["Standard Bengali", "Chittagonian", "Sylheti"] },
  { code: "ur", name: "Urdu", dialects: ["Dakhini", "Rekhta", "Modern Standard Urdu"] },
  { code: "fa", name: "Persian", dialects: ["Tehrani Persian", "Dari", "Tajik"] },
  { code: "sw", name: "Swahili", dialects: ["Coastal Swahili", "Congolese Swahili", "Standard Swahili"] },
];

export const getDialectsForLanguage = (languageCode: string) => {
  const language = languages.find(lang => lang.code === languageCode);
  return language?.dialects || [];
};
