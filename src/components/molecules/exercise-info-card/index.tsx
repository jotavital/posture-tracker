import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { ExerciseInfoCardRightActions } from '~/components/molecules/exercise-info-card/right-actions';
import { styles } from '~/components/molecules/exercise-info-card/styles';
import { Exercise } from '~/entities/Exercise';
import { colors } from '~/styles/colors';

interface Props {
	exercise: Exercise;
}

export const ExerciseInfoCard: React.FC<Props> = ({ exercise }: Props) => {
	const handleRenderRightActions = (_, dragX) => {
		return <ExerciseInfoCardRightActions dragX={dragX} exerciseId={exercise.id} />;
	};

	return (
		<Swipeable
			renderRightActions={handleRenderRightActions}
			containerStyle={styles.swipeableContainer}
			overshootRight={false}
		>
			<View style={styles.container}>
				<View style={styles.timeDisplay}>
					<MaterialCommunityIcons
						name='timer-sand-complete'
						size={24}
						color={colors.text}
						style={styles.icons}
					/>
					<Text style={styles.text}>{exercise.total_time}</Text>
				</View>
				<View style={styles.timeDisplay}>
					<AntDesign
						name='clockcircleo'
						size={20}
						color={colors.text}
						style={styles.icons}
					/>
					<Text style={styles.text}>{exercise.end_time}</Text>
				</View>
			</View>
		</Swipeable>
	);
};
