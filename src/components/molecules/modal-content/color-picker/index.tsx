import { Ionicons } from '@expo/vector-icons';
import { Dispatch, SetStateAction, useState } from 'react';
import { View } from 'react-native';
import { returnedResults } from 'reanimated-color-picker';
import { Button } from '~/components/atoms/button';
import { AppColorPicker } from '~/components/atoms/color-picker';
import { styles } from '~/components/molecules/modal-content/color-picker/styles';
import { useTheme } from '~/contexts/theme-context';

interface Props {
	setIsColorPickerModalVisible: Dispatch<SetStateAction<boolean>>;
}

export const ColorPickerModalContent: React.FC<Props> = ({
	setIsColorPickerModalVisible,
}: Props) => {
	const { colors, handleSetUserColors } = useTheme();
	const [pickerColor, setPickerColor] = useState<string>(colors.primary);

	const onCompletePickColor = ({ hex }: returnedResults) => {
		setPickerColor(hex);
	};

	const handleSetPrimaryColor = () => {
		handleSetUserColors({ primary: pickerColor });
		setIsColorPickerModalVisible(false);
	};

	return (
		<View style={styles.container}>
			<AppColorPicker onComplete={onCompletePickColor} />
			<Button
				leftIcon={
					<Ionicons name='checkmark-circle-outline' size={20} color={colors.text} />
				}
				title='Pronto'
				onPress={handleSetPrimaryColor}
			/>
		</View>
	);
};
