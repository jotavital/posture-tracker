import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	button: {
		borderRadius: 6,
		display: 'flex',
		flexDirection: 'row',
		gap: 5,
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
});
