import { Text, View } from 'react-native';
import RNPickerSelect, { Item } from 'react-native-picker-select';
import { styles } from '~/components/atoms/picker/styles';
import { useTheme } from '~/contexts/theme-context';

interface Props {
	items: Item[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onChange?: (value: any, index: number) => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	defaultValue?: any;
	placeholder?: Item | Record<string, never>;
}

export const Picker: React.FC<Props> = ({
	items,
	onChange = undefined,
	defaultValue = undefined,
	placeholder = {},
}: Props) => {
	const { colors } = useTheme();

	return (
		<View style={styles.container}>
			<Text style={{ ...styles.label, color: colors.text }}>Tema</Text>

			<RNPickerSelect
				items={items}
				onValueChange={onChange && onChange}
				value={defaultValue}
				style={{
					viewContainer: {
						...styles.pickerViewContainer,
						borderColor: colors.text,
					},
					placeholder: { color: colors.text },
					inputAndroid: { color: colors.text },
				}}
				placeholder={placeholder}
			/>
		</View>
	);
};
