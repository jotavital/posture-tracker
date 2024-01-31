import { ReactNode } from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import { styles } from '~/components/atoms/button/icon-button/styles';

interface Props {
	onPress: () => void;
	icon: ReactNode;
}

export const IconButton: React.FC<Props> = ({ onPress, icon }: Props) => {
	return (
		<BorderlessButton onPress={onPress} style={styles.button}>
			{icon && icon}
		</BorderlessButton>
	);
};
