import { ColorSchemeName } from 'react-native';

export interface ThemeContextValue {
	colors: Colors;
	colorScheme: ColorSchemeName;
	selectedColorScheme: SelectColorSchemeOptions;
	isDark: boolean;
	isLight: boolean;
	handleSetSelectedColorScheme: (colorScheme: ColorSchemeName) => void;
	handleSetUserColors: (colors: Colors) => void;
}

export type SelectColorSchemeOptions = ColorSchemeName | 'system';

export interface Colors {
	background?: string;
	black?: string;
	blue?: string;
	contrastBackground?: string;
	contrastText?: string;
	darkGray?: string;
	green?: string;
	lighGray?: string;
	primary?: string;
	red?: string;
	text?: string;
	transparent?: string;
	white?: string;
	yellow?: string;
	disabledText?: string;
}
