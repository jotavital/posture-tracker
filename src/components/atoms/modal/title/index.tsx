import { Text } from 'react-native';
import { styles } from '~/components/atoms/modal/title/style';

interface Props {
	title: string;
}

export const ModalTitle: React.FC<Props> = ({ title }: Props) => {
	return <Text style={styles.title}>{title}</Text>;
};
