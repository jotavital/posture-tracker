import MaskInput from 'react-native-mask-input';
import { View } from 'react-native';
import { Text } from '~/components/atoms/text';
import { useTheme } from '~/contexts/theme-context';

interface Props {
	value: string;
	onChangeText: (masked: string, unmasked: string, obfuscated: string) => void;
}

export const TimeInput: React.FC<Props> = ({ value, onChangeText }: Props) => {
	const { colors, isDark } = useTheme();

	return (
		<View style={{ alignItems: 'center', marginVertical: 40 }}>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: colors.contrastBackground || (isDark ? '#2C2C2E' : '#F2F2F7'),
					paddingHorizontal: 40,
					paddingVertical: 20,
					borderRadius: 24,
					borderWidth: 1,
					borderColor: isDark ? '#3A3A3C' : '#E5E5EA',
					shadowColor: '#000',
					shadowOffset: { width: 0, height: 8 },
					shadowOpacity: isDark ? 0.3 : 0.08,
					shadowRadius: 16,
					elevation: 6,
				}}
			>
				<MaskInput
					value={value}
					onChangeText={onChangeText}
					mask={[/[0-5]/, /\d/, ':', /[0-5]/, /\d/]}
					keyboardType='numeric'
					style={{
						fontSize: 64,
						fontWeight: '800',
						fontVariant: ['tabular-nums'],
						letterSpacing: 2,
						color: colors.primary,
						textAlign: 'center',
						minWidth: 200,
					}}
					autoFocus
					placeholder='00:00'
					placeholderTextColor={isDark ? '#636366' : '#AEAEB2'}
				/>
			</View>
			<Text
				style={{
					marginTop: 18,
					fontSize: 14,
					color: colors.text,
					opacity: 0.6,
					fontWeight: '600',
					letterSpacing: 0.5,
				}}
			>
				Insira os minutos e segundos
			</Text>
		</View>
	);
};
