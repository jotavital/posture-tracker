import { Picker as NativePicker } from '@react-native-picker/picker';
import { useState } from 'react';
import { Platform, Pressable, View } from 'react-native';
import { Text } from '~/components/atoms/text';
import { styles } from '~/components/atoms/picker/styles';
import { Modal } from '~/components/organisms/modal';
import { useTheme } from '~/contexts/theme-context';

export interface Item {
	label: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	value: any;
	key?: string | number;
	color?: string;
}

interface Props {
	items: Item[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onChange?: (value: any, index: number) => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	defaultValue?: any;
	label?: string;
	placeholder?: Item | Record<string, never>;
}

export const Picker: React.FC<Props> = ({
	items,
	onChange = undefined,
	defaultValue = undefined,
	label = undefined,
	placeholder = {},
}: Props) => {
	const { colors } = useTheme();
	const [isVisible, setIsVisible] = useState(false);

	const selectedItem = items.find((item) => item.value === defaultValue);
	const displayLabel = selectedItem ? selectedItem.label : (placeholder.label as string) || '';

	return (
		<View style={styles.container}>
			{label && <Text style={{ ...styles.label, color: colors.text }}>{label}</Text>}

			{Platform.OS === 'ios' ? (
				<>
					<Pressable
						onPress={() => setIsVisible(true)}
						style={{
							...styles.pickerViewContainer,
							borderColor: colors.text,
							justifyContent: 'center',
							paddingHorizontal: 10,
						}}
					>
						<Text style={{ color: colors.text }}>{displayLabel}</Text>
					</Pressable>

					<Modal
						isVisible={isVisible}
						onBackdropPress={() => setIsVisible(false)}
						title={'Selecione um tema'}
					>
						<NativePicker
							selectedValue={defaultValue}
							onValueChange={(val, index) => {
								if (onChange) onChange(val, index);
							}}
							style={{ color: colors.text, height: 200, width: '100%' }}
							itemStyle={{ color: colors.text, height: 200 }}
						>
							{Object.keys(placeholder).length > 0 && placeholder.label && (
								<NativePicker.Item
									label={placeholder.label as string}
									value={placeholder.value}
									color='gray'
								/>
							)}
							{items.map((item, index) => (
								<NativePicker.Item
									key={index}
									label={item.label}
									value={item.value}
									color={colors.text}
								/>
							))}
						</NativePicker>
					</Modal>
				</>
			) : (
				<View
					style={{
						...styles.pickerViewContainer,
						borderColor: colors.text,
						overflow: 'hidden',
						justifyContent: 'center',
					}}
				>
					<NativePicker
						selectedValue={defaultValue}
						onValueChange={onChange}
						style={{
							color: colors.text,
							height: 40,
							width: '100%',
							backgroundColor: 'transparent',
						}}
						dropdownIconColor={colors.text}
					>
						{Object.keys(placeholder).length > 0 && placeholder.label && (
							<NativePicker.Item
								label={placeholder.label as string}
								value={placeholder.value}
								color='gray'
							/>
						)}
						{items.map((item, index) => (
							<NativePicker.Item
								key={index}
								label={item.label}
								value={item.value}
								color={colors.text}
							/>
						))}
					</NativePicker>
				</View>
			)}
		</View>
	);
};
