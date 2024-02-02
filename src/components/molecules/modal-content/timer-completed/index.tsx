import Ionicons from '@expo/vector-icons/Ionicons';
import { Button } from '~/components/atoms/button';
import { useTheme } from '~/contexts/theme-context';

interface Props {
	handleDismissTimerCompleted: () => void;
}

export const TimeCompletedModalContent: React.FC<Props> = ({
	handleDismissTimerCompleted,
}: Props) => {
	const { colors } = useTheme();

	return (
		<Button
			onPress={() => handleDismissTimerCompleted()}
			title='OK'
			leftIcon={<Ionicons name='checkmark-circle-outline' size={20} color={colors.text} />}
		/>
	);
};
