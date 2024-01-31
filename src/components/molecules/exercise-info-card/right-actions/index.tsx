import { FontAwesome } from '@expo/vector-icons';
import { Animated } from 'react-native';
import { IconButton } from '~/components/atoms/button/icon-button';
import { colors } from '~/styles/colors';

export const ExerciseInfoCardRightActions: React.FC = (_, dragX) => {
	const translateX = dragX.interpolate({
		inputRange: [-50, 0],
		outputRange: [0, 50],
	});

	return (
		// eslint-disable-next-line react-native/no-inline-styles
		<Animated.View style={{ width: 50, transform: [{ translateX: translateX }] }}>
			<IconButton
				onPress={() => console.log('fods')}
				icon={<FontAwesome name='trash-o' size={24} color={colors.white} />}
			/>
		</Animated.View>
	);
};
