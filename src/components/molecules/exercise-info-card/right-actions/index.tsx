import { FontAwesome } from '@expo/vector-icons';
import { Animated } from 'react-native';
import { IconButton } from '~/components/atoms/button/icon-button';
import { useExercises } from '~/contexts/exercise-context';
import { colors } from '~/styles/colors';

interface Props {
	dragX: Animated.AnimatedInterpolation<string | number>;
	exerciseId: number;
}

export const ExerciseInfoCardRightActions: React.FC<Props> = ({ dragX, exerciseId }: Props) => {
	const { handleOpenDeleteModal } = useExercises();

	const translateX = dragX.interpolate({
		inputRange: [-50, 0],
		outputRange: [0, 50],
	});

	return (
		// eslint-disable-next-line react-native/no-inline-styles
		<Animated.View style={{ width: 50, transform: [{ translateX: translateX }] }}>
			<IconButton
				onPress={() => handleOpenDeleteModal(exerciseId)}
				icon={<FontAwesome name='trash-o' size={24} color={colors.white} />}
				bg={colors.red}
			/>
		</Animated.View>
	);
};
