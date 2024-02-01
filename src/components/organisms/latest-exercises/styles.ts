import { StyleSheet } from 'react-native';
import { colors } from '~/styles/colors';

export const styles = StyleSheet.create({
	container: {
		display: 'flex',
		gap: 15,
		marginTop: 10,
		padding: 10,
	},
	title: {
		color: colors.text,
		fontSize: 18,
		fontWeight: '500',
	},
});
