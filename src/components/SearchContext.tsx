"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface SearchState {
  query: string;
  setQuery: (q: string) => void;
}

const SearchContext = createContext<SearchState>({
  query: "",
  setQuery: () => {},
});

// Shares the hero search query with the All Tools filter two sections below it.
export function SearchProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");
  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}
