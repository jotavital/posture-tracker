import { Text } from 'react-native';
import { styles } from '~/components/atoms/modal/title/style';
import { useTheme } from '~/contexts/theme-context';

interface Props {
	title: string;
}

export const ModalTitle: React.FC<Props> = ({ title }: Props) => {
	const { colors } = useTheme();

	return <Text style={[styles.title, { color: colors.text }]}>{title}</Text>;
};
