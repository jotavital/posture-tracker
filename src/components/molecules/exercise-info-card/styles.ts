import { StyleSheet } from 'react-native';
import { colors } from '~/styles/colors';

export const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.background,
		display: 'flex',
		elevation: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 15,
	},
	icons: {
		textAlignVertical: 'center',
	},
	swipeableContainer: {
		borderRadius: 5,
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
