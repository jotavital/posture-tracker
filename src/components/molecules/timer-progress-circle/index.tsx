import { View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { TimeDisplay } from '~/components/atoms/time-display';
import { styles } from '~/components/molecules/timer-progress-circle/styles';
import { useTheme } from '~/contexts/theme-context';
import { useTimer } from '~/contexts/timer-context';

interface Props {
	handleOpenTimePickerModal: () => void;
}

export const TimerProgressCircle: React.FC<Props> = ({ handleOpenTimePickerModal }: Props) => {
	const { colors } = useTheme();
	const { completedPercentage, minutes, seconds } = useTimer();

	return (
		<View style={styles.container}>
			<AnimatedCircularProgress
				size={300}
				width={10}
				fill={completedPercentage}
				tintColor={colors.blue}
				backgroundColor={colors.contrastBackground}
				rotation={360}
				lineCap='round'
			>
				{() => (
					<TimeDisplay
						onPress={handleOpenTimePickerModal}
						minutes={minutes}
						seconds={seconds}
					/>
				)}
			</AnimatedCircularProgress>
		</View>
	);
};
