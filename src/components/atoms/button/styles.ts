import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	button: {
		display: 'flex',
		flexDirection: 'row',
		gap: 5,
		justifyContent: 'center',
		padding: 10,
	},
	buttonText: {
		fontSize: 16,
		fontWeight: '500',
		textAlignVertical: 'center',
	},
	disabled: {
		opacity: 0.5,
	},
	rounded: {
		borderRadius: 6,
	},
	square: {
		borderRadius: 0,
	},
});
