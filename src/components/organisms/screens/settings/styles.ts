import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	colorPickerButton: { borderRadius: 4, height: 40, width: '20%' },
	container: { display: 'flex', gap: 15, marginTop: 20, padding: 15 },
	itemContainer: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },
	itemLabel: { fontSize: 15, textAlignVertical: 'center', width: '50%' },
});
