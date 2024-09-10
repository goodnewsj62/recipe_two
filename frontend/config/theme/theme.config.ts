"use client";
import {
  ThemeOptions,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";

export const defaultTheme = customizeTheme();

export const lightTheme = responsiveFontSizes(
  customizeTheme({
    palette: {
      primary: {
        main: "#FFDED6",
      },
    },
    // shadows: [] as any,
  })
);
export const darkTheme = responsiveFontSizes(
  customizeTheme({ palette: { mode: "dark" } })
);

export function customizeTheme(theme?: ThemeOptions) {
  return createTheme({
    ...theme,
    breakpoints: {
      values: {
        xs: 0,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
        "2xl": 1536,
      },
    },
    shape: {
      borderRadius: 10,
    },
    typography: {
      fontFamily: [
        "'Inter'",
        "sans-serif",
        "-apple-system",
        "BlinkMacSystemFont",
      ].join(),
      // fontSize: 12,
      // fontWeightRegular: 500,
      // fontWeightBold: 600,
      sansitaSwashed: {
        fontFamily: [
          "'Sansita Swashed'",
          "sans-serif",
          "-apple-system",
          "BlinkMacSystemFont",
        ].join(","),
      },
      button: {
        textTransform: "none",
      },
    },
    components: {
      MuiIcon: {
        defaultProps: {
          baseClassName: "material-symbols-outlined",
        },
      },
    },
  });
}

// NonForwardedProps.set('Button', ['rounded']);
