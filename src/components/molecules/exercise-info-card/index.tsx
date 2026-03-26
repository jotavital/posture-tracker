import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { Text } from '~/components/atoms/text';
import { Swipeable } from 'react-native-gesture-handler';
import { ExerciseInfoCardRightActions } from '~/components/molecules/exercise-info-card/right-actions';
import { styles } from '~/components/molecules/exercise-info-card/styles';
import { useTheme } from '~/contexts/theme-context';
import { Exercise } from '~/entities/Exercise';

interface Props {
	exercise: Exercise;
}

export const ExerciseInfoCard: React.FC<Props> = ({ exercise }: Props) => {
	const { colors } = useTheme();

	const handleRenderRightActions = (_, dragX) => {
		return <ExerciseInfoCardRightActions dragX={dragX} exerciseId={exercise.id} />;
	};

	return (
		<Swipeable
			renderRightActions={handleRenderRightActions}
			containerStyle={styles.swipeableContainer}
			overshootRight={false}
			friction={2}
		>
			<View style={{ ...styles.container, backgroundColor: colors.contrastBackground }}>
				<View style={styles.timeDisplay}>
					<Ionicons
						name='hourglass-outline'
						size={24}
						color={colors.text}
						style={styles.icons}
					/>
					<Text style={{ ...styles.text, color: colors.text }}>
						{exercise.total_time}
					</Text>
				</View>
				<View style={styles.timeDisplay}>
					<Ionicons
						name='time-outline'
						size={20}
						color={colors.text}
						style={styles.icons}
					/>
					<Text style={{ ...styles.text, color: colors.text }}>{exercise.end_time}</Text>
				</View>
			</View>
		</Swipeable>
	);
};
