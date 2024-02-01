import MaskInput from 'react-native-mask-input';
import { styles } from '~/components/atoms/time-input/styles';
import { useTheme } from '~/contexts/theme-context';

interface Props {
	value: string;
	onChangeText: (masked: string, unmasked: string, obfuscated: string) => void;
}

export const TimeInput: React.FC<Props> = ({ value, onChangeText }: Props) => {
	const { colors } = useTheme();

	return (
		<MaskInput
			value={value}
			onChangeText={onChangeText}
			mask={[/[0-5]/, /\d/, ':', /[0-5]/, /\d/]}
			keyboardType='numeric'
			style={{ ...styles.maskInput, color: colors.text }}
			autoFocus
			placeholderTextColor={colors.text}
		/>
	);
};
