import { StyleSheet } from 'react-native';
import { colors } from '~/styles/colors';

export const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.background,
		borderRadius: 5,
		display: 'flex',
		elevation: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 15,
	},
	icons: {
		textAlignVertical: 'center',
	},
	text: {
		fontSize: 15,
		textAlignVertical: 'center',
	},
	timeDisplay: {
		display: 'flex',
		flexDirection: 'row',
		gap: 5,
	},
});
