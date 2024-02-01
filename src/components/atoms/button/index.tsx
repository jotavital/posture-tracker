import { ReactNode } from 'react';
import { ColorValue, Pressable, StyleProp, Text, ViewStyle } from 'react-native';
import { styles } from '~/components/atoms/button/styles';
import { useTheme } from '~/contexts/theme-context';

interface Props {
	onPress?: () => void;
	disabled?: boolean;
	leftIcon?: ReactNode;
	title: string;
	style?: StyleProp<ViewStyle>;
	bg?: ColorValue;
	textColor?: ColorValue;
}

export const Button: React.FC<Props> = ({
	disabled = false,
	onPress = null,
	leftIcon = null,
	title,
	bg = undefined,
	textColor = undefined,
	...rest
}: Props) => {
	const { colors } = useTheme();

	return (
		<Pressable
			style={[
				styles.button,
				disabled && styles.disabled,
				{ backgroundColor: bg ?? colors.contrastBackground },
				rest && rest.style,
			]}
			onPress={onPress && onPress}
			android_ripple={{ color: colors.transparent }}
		>
			{leftIcon && <Text style={styles.buttonText}>{leftIcon}</Text>}
			<Text style={[styles.buttonText, { color: textColor ?? colors.text }]}>{title}</Text>
		</Pressable>
	);
};
