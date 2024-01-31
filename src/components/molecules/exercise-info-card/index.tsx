import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { styles } from '~/components/molecules/exercise-info-card/styles';
import { Exercise } from '~/entities/Exercise';

interface Props {
	exercise: Exercise;
}

export const ExerciseInfoCard: React.FC<Props> = ({ exercise }: Props) => {
	return (
		<View style={styles.container}>
			<View style={styles.timeDisplay}>
				<MaterialCommunityIcons
					name='timer-sand-complete'
					size={24}
					color='black'
					style={styles.icons}
				/>
				<Text style={styles.text}>{exercise.total_time}</Text>
			</View>
			<View style={styles.timeDisplay}>
				<AntDesign name='clockcircleo' size={20} color='black' style={styles.icons} />
				<Text style={styles.text}>{exercise.end_time}</Text>
			</View>
		</View>
	);
};
