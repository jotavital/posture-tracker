import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Picker } from '~/components/atoms/picker';
import { ColorPickerModalContent } from '~/components/molecules/modal-content/color-picker';
import { Modal } from '~/components/organisms/modal';
import { styles } from '~/components/organisms/screens/settings/styles';
import { useTheme } from '~/contexts/theme-context';

export const SettingsScreen: React.FC = () => {
	const [isColorPickerModalVisible, setIsColorPickerModalVisible] = useState<boolean>(false);
	const { setSelectedColorScheme, colors } = useTheme();

	return (
		<View style={{ ...styles.container }}>
			<View style={styles.itemContainer}>
				<Text
					style={{
						...styles.itemLabel,
						color: colors.text,
					}}
				>
					Tema
				</Text>
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

			<View style={styles.itemContainer}>
				<Text
					style={{
						...styles.itemLabel,
						color: colors.text,
					}}
				>
					Cor de destaque
				</Text>
				<Pressable
					onPress={() => setIsColorPickerModalVisible(true)}
					android_ripple={{ color: colors.transparent }}
					style={{
						...styles.colorPickerButton,
						backgroundColor: colors.primary,
					}}
				/>
			</View>

			<Modal
				title='Escolher cor'
				isVisible={isColorPickerModalVisible}
				onBackdropPress={() => setIsColorPickerModalVisible(false)}
			>
				<ColorPickerModalContent
					setIsColorPickerModalVisible={setIsColorPickerModalVisible}
				/>
			</Modal>
		</View>
	);
};
