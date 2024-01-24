import { View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { TimeDisplay } from '~/components/atoms/time-display';
import { styles } from '~/components/molecules/progress-with-timer/styles';
import { colors } from '~/styles/colors';

interface Props {
	completedPercentage: number;
	handleOpenTimePickerModal: () => void;
	minutes: number;
	seconds: number;
}

export const ProgressWithTimer: React.FC<Props> = ({
	completedPercentage,
	handleOpenTimePickerModal,
	minutes,
	seconds,
}: Props) => {
	return (
		<View style={styles.container}>
			<AnimatedCircularProgress
				size={300}
				width={10}
				fill={completedPercentage}
				tintColor={colors.blue}
				backgroundColor={colors.background}
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
