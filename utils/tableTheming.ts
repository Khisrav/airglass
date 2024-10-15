import { themeQuartz, iconSetMaterial } from "ag-grid-community";

export const lightTableTheme = themeQuartz
.withParams({
    accentColor: "#185C37",
    browserColorScheme: "light",
    fontFamily: "inherit",
    foregroundColor: "#000000",
    headerFontSize: 14,
    columnBorder: true,
    wrapperBorderRadius: "0px",
    rowVerticalPaddingScale: 1.5,
});
export const darkTableTheme = themeQuartz
.withParams({
    accentColor: "#33C481",
    browserColorScheme: "dark",
    chromeBackgroundColor: {
        ref: "foregroundColor",
        mix: 0.07,
        onto: "backgroundColor"
    },
    fontFamily: "inherit",
    foregroundColor: "#ffffff",
    backgroundColor: "#1f2836",
    headerFontSize: 14,
    columnBorder: true,
    wrapperBorderRadius: "0px",
    rowVerticalPaddingScale: 1.5,
});

