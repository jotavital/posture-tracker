import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: { display: 'flex', flexDirection: 'row' },
	label: { flex: 1, textAlignVertical: 'center' },
	pickerViewContainer: {
		borderRadius: 6,
		borderWidth: 0.7,
		display: 'flex',
		flex: 1,
		height: 40,
		justifyContent: 'center',
	},
});
