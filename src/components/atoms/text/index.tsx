import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';

export const Text: React.FC<RNTextProps> = ({ style, ...props }) => {
	let fontFamily = 'Outfit_400Regular';

	let flattenStyle = StyleSheet.flatten(style || {});

	if (flattenStyle.fontWeight) {
		flattenStyle = { ...flattenStyle };
		const weight = String(flattenStyle.fontWeight);
		if (weight === 'bold' || weight >= '700') {
			fontFamily = 'Outfit_700Bold';
		} else if (weight >= '600') {
			fontFamily = 'Outfit_600SemiBold';
		}
		delete flattenStyle.fontWeight;
	}

	return <RNText {...props} style={[{ fontFamily }, flattenStyle]} />;
};
