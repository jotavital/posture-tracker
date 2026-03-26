import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 16,
		borderRadius: 16,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.05,
		shadowRadius: 8,
		elevation: 2,
		borderWidth: 1,
	},
	dataBlock: {
		justifyContent: 'center',
	},
	label: {
		fontSize: 12,
		opacity: 0.6,
		marginBottom: 2,
		fontWeight: '500',
	},
	valueText: {
		fontSize: 16,
		fontWeight: '700',
	},
	rightSection: {
		alignItems: 'flex-end',
		justifyContent: 'center',
	},
	swipeableContainer: {
		borderRadius: 16,
		marginBottom: 12,
	},
});
