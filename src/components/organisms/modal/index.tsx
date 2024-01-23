import { ReactNode } from 'react';
import { View } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { ModalTitle } from '~/components/atoms/modal/title';
import { styles } from '~/components/organisms/modal/styles';

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
	return (
		<ReactNativeModal isVisible={isVisible} onBackdropPress={onBackdropPress}>
			<View style={styles.container}>
				{title && <ModalTitle title={title} />}
				{children}
			</View>
		</ReactNativeModal>
	);
};
