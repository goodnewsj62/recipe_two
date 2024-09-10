import "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {}

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    "2xl": true;
  }

  interface TypographyVariants {
    sansitaSwashed: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    sansitaSwashed?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    sansitaSwashed: true;
  }
}
