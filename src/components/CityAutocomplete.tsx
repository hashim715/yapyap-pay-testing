import { useState, useEffect, useRef } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { formStorage } from "@/utils/formStorage";

interface City {
  name: string;
  country: string;
  displayName: string;
}

interface CityAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

export const CityAutocomplete = ({
  value,
  onChange,
  label,
  placeholder,
}: CityAutocompleteProps) => {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [enableAutocomplete, setEnableAutocomplete] = useState(true);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const savedData = formStorage.get();
    if (savedData.cityOfResidence && savedData.cityOfResidence.trim() !== "") {
      setQuery(savedData.cityOfResidence);
      setEnableAutocomplete(false);
    } else {
      setEnableAutocomplete(true);
    }
  }, []);

  useEffect(() => {
    if (value) {
      setQuery(value);
    }
  }, [value]);

  const fetchCities = async (searchQuery: string) => {
    if (!enableAutocomplete) {
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    try {
      setLoading(true);

      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?` +
          `text=${encodeURIComponent(searchQuery)}` +
          `&type=city` +
          `&format=json` +
          `&apiKey=52a81e0423464794a2193a5ba9abfd3a`,
        {
          method: "GET",
          signal: abortControllerRef.current.signal,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch cities");
      }

      const data = await response.json();
      console.log("API Response:", data);

      const cities: City[] = data.results
        ? data.results
            .map((item: any) => ({
              name: item.city || item.name,
              country: item.country || "Unknown",
              displayName: `${item.city || item.name}, ${item.country}`,
            }))
            .filter((city: City, index: number, self: City[]) => {
              return (
                index ===
                self.findIndex((c) => c.displayName === city.displayName)
              );
            })
            .slice(0, 8)
        : [];

      setSuggestions(cities);
      setShowSuggestions(cities.length > 0);
    } catch (error: any) {
      if (error.name !== "AbortError") {
        console.error("Error fetching cities:", error);
        setSuggestions([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (inputValue: string) => {
    setQuery(inputValue);

    if (!enableAutocomplete) {
      onChange(inputValue);
      return;
    }

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (inputValue.trim().length >= 2) {
      debounceTimerRef.current = setTimeout(() => {
        fetchCities(inputValue.trim());
      }, 300);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setLoading(false);
    }
  };

  const handleSelectCity = (city: City) => {
    setQuery(city.displayName);
    onChange(city.displayName);
    setShowSuggestions(false);
  };

  return (
    <div ref={wrapperRef} className="relative">
      {label && (
        <Label className="text-[12px] font-normal mb-1.5 block text-muted-foreground">
          {label}
        </Label>
      )}
      <Input
        type="text"
        value={query}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={() => {
          if (
            enableAutocomplete &&
            query.length >= 2 &&
            suggestions.length > 0
          ) {
            setShowSuggestions(true);
          }
        }}
        placeholder={placeholder || "Type to search cities..."}
        className="w-full h-9 text-[13px]"
      />

      {enableAutocomplete && showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-background border border-border rounded-lg overflow-hidden shadow-lg">
          {suggestions.map((city, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSelectCity(city)}
              className="w-full px-3 py-2 text-left hover:bg-muted transition-colors border-b border-border last:border-b-0"
            >
              <div className="text-[13px] font-medium">{city.name}</div>
              <div className="text-[11px] text-muted-foreground">
                {city.country}
              </div>
            </button>
          ))}
        </div>
      )}

      {enableAutocomplete && loading && (
        <div className="absolute right-3 top-[34px] text-[11px] text-muted-foreground">
          Searching...
        </div>
      )}

      {enableAutocomplete &&
        showSuggestions &&
        !loading &&
        suggestions.length === 0 &&
        query.length >= 2 && (
          <div className="absolute z-50 w-full mt-1 bg-background border border-border rounded-lg p-3">
            <div className="text-[13px] text-muted-foreground">
              No cities found
            </div>
          </div>
        )}
    </div>
  );
};
