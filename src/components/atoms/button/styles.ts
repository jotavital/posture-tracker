import { StyleSheet } from 'react-native';
import { colors } from '~/styles/colors';

export const styles = StyleSheet.create({
	button: {
		backgroundColor: colors.background,
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
