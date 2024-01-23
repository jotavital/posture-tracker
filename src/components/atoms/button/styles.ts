import { StyleSheet } from 'react-native';
import { colors } from '~/styles/colors';

export const styles = StyleSheet.create({
	button: {
		backgroundColor: colors.background,
		padding: 10,
		borderRadius: 6,
		display: 'flex',
		flexDirection: 'row',
		gap: 5,
	},
	buttonText: {
		textAlignVertical: 'center',
		fontSize: 16,
		fontWeight: '500',
	},
	disabled: {
		opacity: 0.5,
	},
});
