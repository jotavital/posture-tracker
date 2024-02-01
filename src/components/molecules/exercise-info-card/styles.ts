import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		display: 'flex',
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
