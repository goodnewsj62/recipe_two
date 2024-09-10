"use client";

import { Palette, useMediaQuery } from "@mui/material";
import { PropsWithChildren, useEffect } from "react";
import { lightTheme } from "./theme.config";

type AppThemeWrapperProps = PropsWithChildren;
const AppThemeWrapper: React.FC<AppThemeWrapperProps> = ({ children }) => {
  const isSystemDark = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = isSystemDark ? lightTheme : lightTheme; // short circuit as we don't have dark theme rt now

  useEffect(() => {
    // hydrate head with useful css variables from mui
    if (isSystemDark) {
      document.documentElement
        .getElementsByTagName("body")[0]
        .classList.add("dark");
    } else {
      document.documentElement
        .getElementsByTagName("body")[0]
        .classList.remove("dark");
    }

    const paletteKeys: (keyof Palette)[] = [
      "primary",
      "secondary",
      "success",
      "info",
      "warning",
      "error",
      "common",
      "text",
      "background",
      "action",
    ];

    paletteKeys.forEach((paletteKey) => {
      const palt = paletteKey as keyof Palette;
      Object.keys(theme.palette[palt]).forEach((paletteKeyColor) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const value = (theme.palette[palt] as Record<string, any>)[
          paletteKeyColor
        ];

        document.documentElement.style.setProperty(
          `--color-${paletteKey}-${paletteKeyColor}`,
          value
        );
      });
    });
  }, [isSystemDark, theme.palette]);
  return <>{children}</>;
};

export default AppThemeWrapper;
