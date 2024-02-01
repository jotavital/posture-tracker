import { Pressable, Text } from 'react-native';
import { styles } from '~/components/atoms/time-display/styles';
import { useTheme } from '~/contexts/theme-context';

interface Props {
	minutes: number;
	seconds: number;
	onPress: () => void;
}

export const TimeDisplay: React.FC<Props> = ({ minutes, seconds, onPress }: Props) => {
	const { colors } = useTheme();

	return (
		<Pressable onPress={onPress}>
			<Text
				style={{ ...styles.timerText, color: colors.text }}
			>{`${minutes.toString().padStart(2, '0')}:${seconds
				.toString()
				.padStart(2, '0')}`}</Text>
		</Pressable>
	);
};
