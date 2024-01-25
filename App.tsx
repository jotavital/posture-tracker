import { openDatabase } from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MainTimer } from '~/components/organisms/main-timer';
import { TimerProvider } from '~/contexts/timer-context';
import { styles } from './styles';

export default function App() {
	const db = openDatabase('posture-tracker');

	// implementar SQLITE com sequelize
	useEffect(() => {
		db.transaction((tx) => {
			tx.executeSql(
				'create table if not exists exercises (id integer primary key not null, initial_time int, total_time text, end_time text);',
			);
		});
	}, []);

	return (
		<SafeAreaView style={styles.safeAreaView}>
			<StatusBar style='auto' />

			<TimerProvider>
				<MainTimer />
			</TimerProvider>
		</SafeAreaView>
	);
}
