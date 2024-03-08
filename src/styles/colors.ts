import { ColorSchemeName } from 'react-native';
import { Colors } from '~/contexts/theme-context/types';

export const lightColors: Colors = {
	background: '#F5F5F5',
	black: '#000000',
	blue: '#0496ff',
	contrastBackground: '#E0E0E0',
	contrastText: '#E0E0E0',
	darkGray: '#073B4C',
	green: '#29bf12',
	lighGray: '#c9c9c9',
	primary: '#0496ff',
	red: '#EF476F',
	text: '#212121',
	transparent: '#ffffff66',
	white: '#ffffff',
	yellow: '#FFD166',
	disabledText: '#E0E0E0',
};

export const darkColors: Colors = {
	...lightColors,

	background: '#121212',
	contrastBackground: '#ffffff1f',
	text: '#ffffffde',
	disabledText: '#525252',
};

export const getColors = (colorScheme: ColorSchemeName, colorsToInject: Colors = {}) => {
	return colorScheme === 'dark'
		? { ...darkColors, ...colorsToInject }
		: { ...lightColors, ...colorsToInject };
};
