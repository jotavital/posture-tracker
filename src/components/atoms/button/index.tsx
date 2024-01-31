import { ReactNode } from 'react';
import { ColorValue, Pressable, StyleProp, Text, ViewStyle } from 'react-native';
import { styles } from '~/components/atoms/button/styles';
import { colors } from '~/styles/colors';

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
	return (
		<Pressable
			style={[
				styles.button,
				disabled && styles.disabled,
				{ backgroundColor: bg ?? colors.background },
				rest && rest.style,
			]}
			onPress={onPress && onPress}
			android_ripple={{ color: colors.transparent }}
		>
			{leftIcon && <Text style={styles.buttonText}>{leftIcon}</Text>}
			<Text style={[styles.buttonText, { color: textColor ?? colors.black }]}>{title}</Text>
		</Pressable>
	);
};
