import { Appearance } from 'react-native';

interface Colors {
	white: string;
	black: string;
	red: string;
	green: string;
	blue: string;
	yellow: string;
	darkGray: string;
	lighGray: string;
	background: string;
	transparent: string;
	text: string;
	contrastBackground?: string;
}

const colorScheme = Appearance.getColorScheme();

const lightColors: Colors = {
	white: '#ffffff',
	black: '#000000',
	red: '#EF476F',
	green: '#29bf12',
	blue: '#0496ff',
	yellow: '#FFD166',
	darkGray: '#073B4C',
	lighGray: '#c9c9c9',
	background: '#ededed',
	transparent: '#ffffff66',
	text: '#000000',
};

const darkColors = {
	...lightColors,

	background: '#121212',
	contrastBackground: '#ffffff1f',
	transparent: '#ffffff66',
	text: '#ffffffde',
};

let colors = lightColors;

if (colorScheme === 'dark') {
	colors = darkColors;
}

export { colors };
