import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { Button } from '~/components/atoms/button';
import { TimeInput } from '~/components/atoms/time-input';
import { useTimer } from '~/contexts/timer-context';

interface Props {
	handleCloseTimePickerModal: () => void;
}

export const TimePickerModalContent: React.FC<Props> = ({ handleCloseTimePickerModal }: Props) => {
	const [timeInputValue, setTimeInputValue] = useState<string>('');

	const { setInitialTime } = useTimer();

	return (
		<>
			<TimeInput
				value={timeInputValue}
				onChangeText={(masked, unmasked) => {
					setTimeInputValue(unmasked);

					const splittedInputTime = masked.split(':');
					const inputMinutes = Number(splittedInputTime[0] ?? 0);
					const inputSeconds = Number(splittedInputTime[1] ?? 0);

					setInitialTime(inputMinutes * 60 * 1000 + inputSeconds * 1000);
				}}
			/>

			<Button
				onPress={handleCloseTimePickerModal}
				title='Pronto'
				leftIcon={<Ionicons name='checkmark-circle-outline' size={20} />}
			/>
		</>
	);
};
