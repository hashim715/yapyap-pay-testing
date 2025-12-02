import { useState } from "react";
import { Label } from "./ui/label";
import { X } from "lucide-react";
import { languages } from "@/data/languages";

interface LanguageSelectorProps {
  selected: string[];
  onChange: (languages: string[]) => void;
  maxSelection?: number;
  label?: string;
}

export const LanguageSelector = ({ 
  selected, 
  onChange, 
  maxSelection = 3,
  label 
}: LanguageSelectorProps) => {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredLanguages = languages.filter(lang =>
    lang.name.toLowerCase().includes(query.toLowerCase()) &&
    !selected.includes(lang.code)
  );

  const handleSelect = (code: string) => {
    if (selected.length < maxSelection) {
      onChange([...selected, code]);
      setQuery("");
      setShowDropdown(false);
    }
  };

  const handleRemove = (code: string) => {
    onChange(selected.filter(c => c !== code));
  };

  const getLanguageName = (code: string) => {
    return languages.find(lang => lang.code === code)?.name || code;
  };

  return (
    <div className="space-y-2.5">
      {label && <Label className="text-[12px] font-normal text-muted-foreground">{label}</Label>}
      
      {/* Selected languages as pills */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {selected.map(code => (
            <div
              key={code}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary text-primary-foreground rounded-full text-[12px] font-medium"
            >
              {getLanguageName(code)}
              <button
                type="button"
                onClick={() => handleRemove(code)}
                className="hover:opacity-70 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input field */}
      {selected.length < maxSelection && (
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            placeholder={`Select up to ${maxSelection} languages...`}
            className="w-full h-9 px-3 py-2 border border-input rounded-lg text-[13px] focus:outline-none focus:ring-1 focus:ring-ring transition-all"
          />

          {/* Dropdown */}
          {showDropdown && filteredLanguages.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-background border border-border rounded-lg max-h-60 overflow-y-auto">
              {filteredLanguages.slice(0, 10).map(lang => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleSelect(lang.code)}
                  className="w-full px-3 py-2 text-left text-[13px] hover:bg-muted transition-colors border-b border-border last:border-b-0"
                >
                  {lang.name}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {selected.length >= maxSelection && (
        <p className="text-[11px] text-muted-foreground">
          Maximum {maxSelection} languages selected
        </p>
      )}
    </div>
  );
};
