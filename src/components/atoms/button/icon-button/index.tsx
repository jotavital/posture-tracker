import { ReactNode } from 'react';
import { ColorValue } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { styles } from '~/components/atoms/button/icon-button/styles';

interface Props {
	onPress: () => void;
	icon: ReactNode;
	bg?: ColorValue;
}

export const IconButton: React.FC<Props> = ({ onPress, icon, bg = 'blue' }: Props) => {
	return (
		<BorderlessButton onPress={onPress} style={[styles.button, { backgroundColor: bg }]}>
			{icon && icon}
		</BorderlessButton>
	);
};
