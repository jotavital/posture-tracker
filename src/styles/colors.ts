import { ColorSchemeName } from 'react-native';
import { Colors } from '~/contexts/theme-context/types';

export const lightColors: Colors = {
	background: '#ffffff',
	black: '#000000',
	blue: '#0496ff',
	contrastBackground: '#E0E0E0',
	darkGray: '#073B4C',
	green: '#29bf12',
	lighGray: '#c9c9c9',
	red: '#EF476F',
	text: '#000000',
	transparent: '#ffffff66',
	white: '#ffffff',
	yellow: '#FFD166',
};

export const darkColors: Colors = {
	...lightColors,

	background: '#121212',
	contrastBackground: '#ffffff1f',
	text: '#ffffffde',
};

export const getColors = (colorScheme: ColorSchemeName) => {
	return colorScheme === 'dark' ? darkColors : lightColors;
};
