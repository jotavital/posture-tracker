import { View } from 'react-native';
import { Picker } from '~/components/atoms/picker';
import { styles } from '~/components/organisms/screens/settings/styles';
import { useTheme } from '~/contexts/theme-context';

export const SettingsScreen: React.FC = () => {
	const { setSelectedColorScheme } = useTheme();

	return (
		<View style={{ ...styles.container }}>
			<Picker
				items={[
					{
						label: 'Escuro',
						value: 'dark',
					},
					{
						label: 'Claro',
						value: 'light',
					},
				]}
				onChange={(value) => setSelectedColorScheme(value)}
				placeholder={{
					label: 'Sistema',
					value: 'system',
				}}
			/>
		</View>
	);
};
