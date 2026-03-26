import { Ionicons } from '@expo/vector-icons';
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
		<SafeAreaView
			style={{ flex: 1, backgroundColor: colors.background }}
			edges={['top', 'left', 'right']}
		>
			<Tab.Navigator
				screenOptions={{
					tabBarActiveTintColor: colors.primary,
					tabBarInactiveTintColor: isDark ? '#8E8E93' : '#A0A0A5',
					tabBarStyle: {
						backgroundColor: isDark ? colors.black : colors.white,
						borderTopWidth: 0,
						elevation: 8,
						shadowColor: '#000',
						shadowOffset: { width: 0, height: -2 },
						shadowOpacity: isDark ? 0.2 : 0.05,
						shadowRadius: 6,
					},
					tabBarLabelStyle: {
						fontSize: 12,
						fontWeight: '600',
					},
				}}
				sceneContainerStyle={{ backgroundColor: colors.background }}
				initialRouteName='timer'
			>
				<Tab.Screen
					name='timer'
					component={HomeScreen}
					options={{
						headerShown: false,
						tabBarIcon: ({ color, focused }) => {
							return (
								<Ionicons
									name={focused ? 'timer' : 'timer-outline'}
									size={24}
									color={color}
								/>
							);
						},
						tabBarLabel: 'Timer',
					}}
				/>
				<Tab.Screen
					name='exercises'
					component={ExercisesScreen}
					options={{
						headerShown: false,
						tabBarIcon: ({ color, focused }) => {
							return (
								<Ionicons
									name={focused ? 'list' : 'list-outline'}
									size={24}
									color={color}
								/>
							);
						},
						tabBarLabel: 'Histórico',
					}}
				/>
				<Tab.Screen
					name='settings'
					component={SettingsScreen}
					options={{
						headerShown: false,
						tabBarIcon: ({ color, focused }) => {
							return (
								<Ionicons
									name={focused ? 'settings' : 'settings-outline'}
									size={24}
									color={color}
								/>
							);
						},
						tabBarLabel: 'Configurações',
					}}
				/>
			</Tab.Navigator>
		</SafeAreaView>
	);
};
