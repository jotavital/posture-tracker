import { AntDesign, Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ExercisesScreen } from '~/components/organisms/screens/exercises';
import { HomeScreen } from '~/components/organisms/screens/home';
import { SettingsScreen } from '~/components/organisms/screens/settings';
import { useTheme } from '~/contexts/theme-context';

export const MainNavigator: React.FC = () => {
	const Tab = createBottomTabNavigator();
	const { colors, isDark } = useTheme();

	return (
		<Tab.Navigator
			screenOptions={{
				tabBarActiveTintColor: colors.primary,
				tabBarStyle: { backgroundColor: isDark ? colors.black : colors.white },
				tabBarLabelStyle: { fontSize: 12 },
			}}
			sceneContainerStyle={{ backgroundColor: colors.background }}
			initialRouteName='exercises'
		>
			<Tab.Screen
				name='timer'
				component={HomeScreen}
				options={{
					headerShown: false,
					tabBarIcon: ({ color }) => {
						return <AntDesign name='clockcircleo' size={20} color={color} />;
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
	);
};
