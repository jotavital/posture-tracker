import { AntDesign, Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ExercisesScreen } from '~/components/organisms/screens/exercises';
import { HomeScreen } from '~/components/organisms/screens/home';
import { SettingsScreen } from '~/components/organisms/screens/settings';
import { useTheme } from '~/contexts/theme-context';

export const MainNavigator: React.FC = () => {
	const Tab = createBottomTabNavigator();
	const { colors, isDark } = useTheme();

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top', 'left', 'right']}>
			<Tab.Navigator
				screenOptions={{
					tabBarActiveTintColor: colors.primary,
					tabBarStyle: { backgroundColor: isDark ? colors.black : colors.white },
					tabBarLabelStyle: { fontSize: 12 },
				}}
				sceneContainerStyle={{ backgroundColor: colors.background }}
				initialRouteName='timer'
			>
				<Tab.Screen
					name='timer'
					component={HomeScreen}
					options={{
						headerShown: false,
						tabBarIcon: ({ color }) => {
							return <AntDesign name='clock-circle' size={20} color={color} />;
						},
						tabBarLabel: 'Timer',
					}}
				/>
				<Tab.Screen
					name='exercises'
					component={ExercisesScreen}
					options={{
						headerShown: false,
						tabBarIcon: ({ color }) => {
							return <Feather name='list' size={24} color={color} />;
						},
						tabBarLabel: 'Histórico',
					}}
				/>
				<Tab.Screen
					name='settings'
					component={SettingsScreen}
					options={{
						headerShown: false,
						tabBarIcon: ({ color }) => {
							return <AntDesign name='setting' size={24} color={color} />;
						},
						tabBarLabel: 'Configurações',
					}}
				/>
			</Tab.Navigator>
		</SafeAreaView>
	);
};
