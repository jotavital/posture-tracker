import { Ionicons } from '@expo/vector-icons';
import { Animated, Pressable } from 'react-native';
import { useExercises } from '~/contexts/exercise-context';
import { useTheme } from '~/contexts/theme-context';

interface Props {
	dragX: Animated.AnimatedInterpolation<string | number>;
	exerciseId: number;
}

export const ExerciseInfoCardRightActions: React.FC<Props> = ({ dragX, exerciseId }: Props) => {
	const { colors } = useTheme();
	const { handleOpenDeleteModal } = useExercises();

	const translateX = dragX.interpolate({
		inputRange: [-70, 0],
		outputRange: [0, 70],
	});

	return (
		<Animated.View style={{ width: 70, transform: [{ translateX }] }}>
			<Pressable
				onPress={() => handleOpenDeleteModal(exerciseId)}
				style={({ pressed }) => ({
					flex: 1,
					backgroundColor: colors.red,
					justifyContent: 'center',
					alignItems: 'center',
					borderRadius: 16,
					marginLeft: 8,
					opacity: pressed ? 0.7 : 1,
					transform: [{ scale: pressed ? 0.95 : 1 }],
				})}
			>
				<Ionicons name='trash' size={24} color={colors.contrastText} />
			</Pressable>
		</Animated.View>
	);
};
