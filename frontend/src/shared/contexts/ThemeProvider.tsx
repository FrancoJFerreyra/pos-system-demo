import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export const ThemeMode = {
  LIGHT: "light",
  DARK: "dark",
} as const;

export type ThemeMode = (typeof ThemeMode)[keyof typeof ThemeMode];

const isThemeMode = (value: string | null): value is ThemeMode =>
  value === ThemeMode.LIGHT || value === ThemeMode.DARK;

export const isDarkThemeMode = (mode: ThemeMode): boolean =>
  mode === ThemeMode.DARK;

type ThemeContextType = {
  mode: ThemeMode;
  toggleTheme: () => void;
  resetToSystem: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

const getSystemTheme = (): ThemeMode =>
  window.matchMedia("(prefers-color-scheme: dark)").matches
    ? ThemeMode.DARK
    : ThemeMode.LIGHT;

const readStoredThemeMode = (): ThemeMode | null => {
  const stored = localStorage.getItem("theme");
  return isThemeMode(stored) ? stored : null;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>(
    () => readStoredThemeMode() ?? getSystemTheme(),
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(ThemeMode.LIGHT, ThemeMode.DARK);
    root.classList.add(mode);
    localStorage.setItem("theme", mode);
  }, [mode]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const handler = () => {
      if (!localStorage.getItem("theme")) {
        setMode(media.matches ? ThemeMode.DARK : ThemeMode.LIGHT);
      }
    };

    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  const toggleTheme = () => {
    setMode((prev) =>
      prev === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT,
    );
  };

  const resetToSystem = () => {
    localStorage.removeItem("theme");
    setMode(getSystemTheme());
  };

  const value = useMemo(
    () => ({
      mode,
      toggleTheme,
      resetToSystem,
    }),
    [mode],
  );

  return (
    <ThemeContext.Provider value={value}> {children} </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx)
    throw new Error("useThemeContext must be used inside ThemeProvider");
  return ctx;
};
