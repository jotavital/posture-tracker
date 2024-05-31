import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Appearance, ColorSchemeName, useColorScheme } from 'react-native';
import {
	Colors,
	SelectColorSchemeOptions,
	ThemeContextValue,
} from '~/contexts/theme-context/types';
import { getColors } from '~/styles/colors';
import { getStorageItem, setStorageItem } from '~/utils/localStorage';

const ThemeContext = createContext<ThemeContextValue>({} as ThemeContextValue);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const deviceColorScheme = useColorScheme();
	const [selectedColorScheme, setSelectedColorScheme] = useState<SelectColorSchemeOptions>(
		Appearance.getColorScheme(),
	);
	const [colorScheme, setColorScheme] = useState<ColorSchemeName>(Appearance.getColorScheme());
	const [userColors, setUserColors] = useState<Colors>({});
	const isDark = colorScheme === 'dark';
	const isLight = colorScheme === 'light';
	const colors = getColors(colorScheme, userColors);
	const colorSchemeStorageKey = 'colorScheme';
	const selectedColorSchemeStorageKey = 'selectedColorScheme';
	const userColorsStorageKey = 'userColors';

	const getStateFromStorage = () => {
		getStorageItem(colorSchemeStorageKey).then((value) => {
			if (value) {
				setColorScheme(value as ColorSchemeName);
			}
		});

		getStorageItem(selectedColorSchemeStorageKey).then((value) => {
			if (value) {
				setSelectedColorScheme(value as SelectColorSchemeOptions);
			}
		});

		getStorageItem(userColorsStorageKey).then((value) => {
			const parsedValue = JSON.parse(value);

			if (parsedValue) {
				setUserColors(parsedValue as Colors);
			}
		});
	};

	const handleSetSelectedColorScheme = (selectedColorScheme: SelectColorSchemeOptions) => {
		console.log('trocou de tema?', selectedColorScheme);
		setStorageItem(selectedColorSchemeStorageKey, selectedColorScheme);

		if (selectedColorScheme === 'system') {
			return handleSetColorScheme(deviceColorScheme);
		}

		handleSetColorScheme(selectedColorScheme);
	};

	const handleSetColorScheme = (colorScheme: ColorSchemeName) => {
		setColorScheme(colorScheme);
		setStorageItem(colorSchemeStorageKey, colorScheme);
	};

	const handleSetUserColors = (selectedColors: Colors) => {
		setUserColors(selectedColors);
		setStorageItem(userColorsStorageKey, JSON.stringify(selectedColors));
	};

	useEffect(() => {
		getStateFromStorage();
	}, []);

	useEffect(() => {
		if (selectedColorScheme === 'system') {
			handleSetColorScheme(deviceColorScheme);
		}
	}, [deviceColorScheme]);

	return (
		<ThemeContext.Provider
			value={{
				colors,
				colorScheme,
				selectedColorScheme,
				isDark,
				isLight,
				handleSetSelectedColorScheme,
				handleSetUserColors,
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
