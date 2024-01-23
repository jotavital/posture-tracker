import Ionicons from '@expo/vector-icons/Ionicons';
import { Button } from '~/components/atoms/button';

interface Props {
	handleDismissTimerCompleted: () => void;
}

export const TimeCompletedModalContent: React.FC<Props> = ({
	handleDismissTimerCompleted,
}: Props) => {
	return (
		<Button
			onPress={() => handleDismissTimerCompleted()}
			title='OK'
			leftIcon={<Ionicons name='checkmark-circle-outline' size={20} />}
		/>
	);
};
