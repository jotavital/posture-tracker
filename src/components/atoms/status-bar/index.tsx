import { StatusBar } from 'expo-status-bar';
import { useTheme } from '~/contexts/theme-context';

export const CustomStatusBar: React.FC = () => {
	const { colors, isDark } = useTheme();

	return <StatusBar style={isDark ? 'light' : 'dark'} backgroundColor={colors.background} />;
};
