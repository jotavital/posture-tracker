import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { Button } from '~/components/atoms/button';
import { TimeInput } from '~/components/atoms/time-input';
import { useTheme } from '~/contexts/theme-context';
import { useTimer } from '~/contexts/timer-context';

interface Props {
	handleCloseTimePickerModal: () => void;
}

export const TimePickerModalContent: React.FC<Props> = ({ handleCloseTimePickerModal }: Props) => {
	const { colors } = useTheme();
	const [timeInputValue, setTimeInputValue] = useState<string>('');
	const { setInitialTime } = useTimer();

	const handleChangeTime = (masked: string, unmasked: string) => {
		setTimeInputValue(unmasked);

		const splittedInputTime = masked.split(':');
		const inputMinutes = Number(splittedInputTime[0] ?? 0);
		const inputSeconds = Number(splittedInputTime[1] ?? 0);

		setInitialTime(inputMinutes * 60 * 1000 + inputSeconds * 1000);
	};

	return (
		<>
			<TimeInput value={timeInputValue} onChangeText={handleChangeTime} />

			<Button
				onPress={handleCloseTimePickerModal}
				title='Pronto'
				leftIcon={
					<Ionicons name='checkmark-circle-outline' size={20} color={colors.text} />
				}
			/>
		</>
	);
};
