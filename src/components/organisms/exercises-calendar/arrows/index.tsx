import { SimpleLineIcons } from '@expo/vector-icons';
import { Direction } from 'react-native-calendars/src/types';
import { useTheme } from '~/contexts/theme-context';

interface Props {
	direction: Direction;
}

export const ExercisesCalendarArrows: React.FC<Props> = ({ direction }: Props) => {
	const { colors } = useTheme();

	if (direction === 'left') {
		return <SimpleLineIcons name='arrow-left' size={18} color={colors.primary} />;
	}

	return <SimpleLineIcons name='arrow-right' size={18} color={colors.primary} />;
};
