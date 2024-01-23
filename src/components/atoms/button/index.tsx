import { ReactNode } from 'react';
import { Pressable, Text } from 'react-native';
import { styles } from '~/components/atoms/button/styles';
import { colors } from '~/styles/colors';

interface Props {
	onPress: () => void;
	disabled?: boolean;
	leftIcon?: ReactNode;
	title: string;
}

export const Button: React.FC<Props> = ({
	disabled = false,
	onPress,
	leftIcon = null,
	title,
}: Props) => {
	return (
		<Pressable
			style={[styles.button, disabled && styles.disabled]}
			onPress={onPress}
			android_ripple={{ color: colors.transparent }}
		>
			{leftIcon && <Text style={styles.buttonText}>{leftIcon}</Text>}
			<Text style={styles.buttonText}>{title}</Text>
		</Pressable>
	);
};
