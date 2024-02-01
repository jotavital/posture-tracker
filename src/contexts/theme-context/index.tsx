import { ReactNode, createContext, useContext } from 'react';
import { useColorScheme } from 'react-native';
import { Colors } from '~/contexts/theme-context/types';
import { getColors } from '~/styles/colors';

interface ThemeContextValue {
	colors: Colors;
}

const ThemeContext = createContext<ThemeContextValue>({} as ThemeContextValue);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const colorScheme = useColorScheme();

	const colors = getColors(colorScheme);

	return <ThemeContext.Provider value={{ colors }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
	const context = useContext(ThemeContext);

	if (Object.keys(context).length) {
		return context;
	}

	throw 'Trying to use useTheme outside of provider';
};
