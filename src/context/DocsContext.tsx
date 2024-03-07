"use client";

import { createContext, ReactNode, useContext } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type DocsContentInterface = {
  lang: string;
  setLang: (lang: string) => void;
};

const DocsContext = createContext<DocsContentInterface>({
  setLang(): void {},
  lang: "EN",
});

export const DocsProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useLocalStorage("docs-lang");

  return (
    <DocsContext.Provider
      value={{
        lang,
        setLang,
      }}
    >
      {children}
    </DocsContext.Provider>
  );
};

export const UseDocs = () => {
  return useContext(DocsContext);
};
