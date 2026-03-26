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
	const { colors, isDark } = useTheme();

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
			<View
				style={[
					styles.container,
					{
						backgroundColor: colors.contrastBackground || (isDark ? '#1C1C1E' : '#FFFFFF'),
						borderColor: isDark ? '#2C2C2E' : '#E5E5EA',
						borderLeftWidth: 4,
						borderLeftColor: colors.primary,
					},
				]}
			>
				<View style={styles.dataBlock}>
					<Text style={[styles.label, { color: colors.text }]}>Duração</Text>
					<Text style={[styles.valueText, { color: colors.text }]}>
						{exercise.total_time}
					</Text>
				</View>

				<View style={styles.rightSection}>
					<Text style={[styles.label, { color: colors.text }]}>Finalizado</Text>
					<Text style={[styles.valueText, { color: colors.text }]}>
						{exercise.end_time}
					</Text>
				</View>
			</View>
		</Swipeable>
	);
};
