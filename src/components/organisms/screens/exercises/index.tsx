import { useEffect } from 'react';
import { View } from 'react-native';
import { AgendaList, CalendarProvider, ExpandableCalendar } from 'react-native-calendars';
import { Positions } from 'react-native-calendars/src/expandableCalendar';
import { ExerciseInfoCard } from '~/components/molecules/exercise-info-card';
import { styles } from '~/components/organisms/screens/exercises/styles';
import { useExercises } from '~/contexts/exercise-context';
import { Exercise } from '~/entities/Exercise';
import { setCalendarLocales } from '~/lang/pt-BR/calendar';

export const ExercisesScreen: React.FC = () => {
	setCalendarLocales();
	const { fetchTodaysExercises, todaysExercises } = useExercises();

	useEffect(() => {
		fetchTodaysExercises();
	}, []);

	return (
		<View style={{ ...styles.container }}>
			<CalendarProvider date={new Date().toDateString()}>
				<ExpandableCalendar initialPosition={Positions.OPEN} />
				<AgendaList
					sections={[
						{
							title: new Date().toDateString(),
							data: todaysExercises,
						},
					]}
					renderItem={({ item }: { item: Exercise }) => {
						return (
							// eslint-disable-next-line react-native/no-inline-styles
							<View style={{ paddingHorizontal: 7 }}>
								<ExerciseInfoCard exercise={item} />
							</View>
						);
					}}
					// eslint-disable-next-line react-native/no-inline-styles
					contentContainerStyle={{ gap: 7 }}
				/>
			</CalendarProvider>
		</View>
	);
};
