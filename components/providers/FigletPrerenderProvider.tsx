"use client";

import { createContext, useContext, type ReactNode } from "react";

export type FigletPrerenderMap = Record<string, string>;

const FigletPrerenderContext = createContext<FigletPrerenderMap | null>(null);

export function FigletPrerenderProvider({
  prerender,
  children
}: {
  prerender: FigletPrerenderMap | null;
  children: ReactNode;
}) {
  return (
    <FigletPrerenderContext.Provider value={prerender}>
      {children}
    </FigletPrerenderContext.Provider>
  );
}

export function useFigletPrerender(): FigletPrerenderMap | null {
  return useContext(FigletPrerenderContext);
}
