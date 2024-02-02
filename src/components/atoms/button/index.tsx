import { Pressable, Text } from 'react-native';
import { styles } from '~/components/atoms/button/styles';
import { ButtonProps } from '~/components/atoms/button/types';
import { useTheme } from '~/contexts/theme-context';

export const Button: React.FC<ButtonProps> = ({
	disabled = false,
	onPress = null,
	leftIcon = null,
	title = undefined,
	bg = undefined,
	textColor = undefined,
	shape = 'rounded',
	height = 'auto',
	...rest
}: ButtonProps) => {
	const { colors } = useTheme();

	const stylesFromProps = { backgroundColor: bg ?? colors.contrastBackground, height: height };

	return (
		<Pressable
			style={[
				styles.button,
				disabled && styles.disabled,
				shape && styles[shape],
				stylesFromProps,
				rest && rest.style,
			]}
			onPress={onPress && onPress}
			android_ripple={{ color: colors.transparent }}
			disabled={disabled}
		>
			{leftIcon && <Text style={styles.buttonText}>{leftIcon}</Text>}
			{title && (
				<Text style={[styles.buttonText, { color: textColor ?? colors.text }]}>
					{title}
				</Text>
			)}
		</Pressable>
	);
};
