import Ionicons from '@expo/vector-icons/Ionicons';
import { Dispatch, SetStateAction } from 'react';
import { Button } from '~/components/atoms/button';
import { TimeInput } from '~/components/atoms/time-input';

interface Props {
	timeInputValue: string;
	setTimeInputValue: Dispatch<SetStateAction<string>>;
	setInitialTime: Dispatch<SetStateAction<number>>;
	handleCloseTimePickerModal: () => void;
}

export const TimePickerModalContent: React.FC<Props> = ({
	timeInputValue,
	setTimeInputValue,
	setInitialTime,
	handleCloseTimePickerModal,
}: Props) => {
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
