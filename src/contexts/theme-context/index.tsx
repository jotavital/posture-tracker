import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';
import { Appearance, ColorSchemeName, useColorScheme } from 'react-native';
import { Colors } from '~/contexts/theme-context/types';
import { getColors } from '~/styles/colors';

interface ThemeContextValue {
	colors: Colors;
	colorScheme: ColorSchemeName;
	isDark: boolean;
	isLight: boolean;
	setSelectedColorScheme: Dispatch<SetStateAction<ColorSchemeName>>;
	setColorsToInject: Dispatch<SetStateAction<Colors>>;
}

const ThemeContext = createContext<ThemeContextValue>({} as ThemeContextValue);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const deviceColorScheme = useColorScheme();
	const [selectedColorScheme, setSelectedColorScheme] = useState<ColorSchemeName | 'system'>(
		Appearance.getColorScheme(),
	);
	const [colorScheme, setColorScheme] = useState<ColorSchemeName>(Appearance.getColorScheme());
	const [colorsToInject, setColorsToInject] = useState<Colors>({});
	const isDark = colorScheme === 'dark';
	const isLight = colorScheme === 'light';
	const colors = getColors(colorScheme, colorsToInject);

	useEffect(() => {
		if (selectedColorScheme === 'system') {
			setColorScheme(deviceColorScheme);
		}
	}, [deviceColorScheme]);

	useEffect(() => {
		if (selectedColorScheme === 'system') {
			return setColorScheme(deviceColorScheme);
		}

		setColorScheme(selectedColorScheme);
	}, [selectedColorScheme]);

	return (
		<ThemeContext.Provider
			value={{
				colors,
				colorScheme,
				isDark,
				isLight,
				setSelectedColorScheme,
				setColorsToInject,
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => {
	const context = useContext(ThemeContext);

	if (Object.keys(context).length) {
		return context;
	}

	throw 'Trying to use useTheme outside of provider';
};
