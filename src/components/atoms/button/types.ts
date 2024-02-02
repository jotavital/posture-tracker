import { ReactNode } from 'react';
import { ColorValue, StyleProp, ViewStyle } from 'react-native';

export interface ButtonProps {
	onPress?: () => void;
	disabled?: boolean;
	leftIcon?: ReactNode;
	title?: string;
	style?: StyleProp<ViewStyle>;
	bg?: ColorValue;
	textColor?: ColorValue;
	shape?: 'square' | 'rounded';
	height?: number | '100%' | 'auto';
}
