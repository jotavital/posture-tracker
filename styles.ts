import { StyleSheet } from 'react-native';
import { colors } from '~/styles/colors';

export const appStyles = StyleSheet.create({
	container: {
		display: 'flex',
		alignItems: 'center',
		padding: 10,
		marginBottom: 10,
	},
	buttonContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		gap: 15,
	},
	button: {
		backgroundColor: colors.background,
		padding: 10,
		borderRadius: 6,
		display: 'flex',
		flexDirection: 'row',
	},
	buttonText: {
		textAlignVertical: 'center',
		fontSize: 16,
		fontWeight: '500',
	},
});
