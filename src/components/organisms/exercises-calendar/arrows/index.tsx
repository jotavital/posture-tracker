import { Ionicons } from '@expo/vector-icons';
import { Direction } from 'react-native-calendars/src/types';
import { useTheme } from '~/contexts/theme-context';

interface Props {
	direction: Direction;
}

export const ExercisesCalendarArrows: React.FC<Props> = ({ direction }: Props) => {
	const { colors } = useTheme();

	if (direction === 'left') {
		return <Ionicons name='chevron-back' size={22} color={colors.primary} />;
	}

	return <Ionicons name='chevron-forward' size={22} color={colors.primary} />;
};
