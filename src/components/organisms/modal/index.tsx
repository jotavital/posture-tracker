import { ReactNode } from 'react';
import { View } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { ModalTitle } from '~/components/atoms/modal/title';
import { styles } from '~/components/organisms/modal/styles';
import { useTheme } from '~/contexts/theme-context';

interface Props {
	title?: string;
	isVisible: boolean;
	onBackdropPress?: () => void;
	children: ReactNode;
}

export const Modal: React.FC<Props> = ({
	title = undefined,
	isVisible,
	onBackdropPress = null,
	children,
}: Props) => {
	const { colors } = useTheme();

	return (
		<ReactNativeModal isVisible={isVisible} onBackdropPress={onBackdropPress}>
			<View style={{ ...styles.container, backgroundColor: colors.background }}>
				{title && <ModalTitle title={title} />}
				{children}
			</View>
		</ReactNativeModal>
	);
};
