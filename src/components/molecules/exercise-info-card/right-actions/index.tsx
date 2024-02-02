import { FontAwesome } from '@expo/vector-icons';
import { Animated } from 'react-native';
import { Button } from '~/components/atoms/button';
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
		inputRange: [-50, 0],
		outputRange: [0, 50],
	});

	return (
		// eslint-disable-next-line react-native/no-inline-styles
		<Animated.View style={{ width: 50, transform: [{ translateX: translateX }] }}>
			<Button
				onPress={() => handleOpenDeleteModal(exerciseId)}
				leftIcon={<FontAwesome name='trash-o' size={24} color={colors.contrastText} />}
				bg={colors.red}
				shape='square'
				height='100%'
			/>
		</Animated.View>
	);
};
