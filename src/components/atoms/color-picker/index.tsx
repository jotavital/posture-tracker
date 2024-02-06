import ColorPicker, { HueSlider, Panel1, Preview, returnedResults } from 'reanimated-color-picker';
import { styles } from '~/components/atoms/color-picker/styles';
import { useTheme } from '~/contexts/theme-context';

interface Props {
	onComplete?: (colors: returnedResults) => void;
}

export const AppColorPicker: React.FC<Props> = ({ onComplete = undefined }: Props) => {
	const { colors } = useTheme();

	return (
		<ColorPicker
			style={styles.container}
			value={colors.primary}
			onComplete={onComplete && onComplete}
		>
			<Preview />
			<Panel1 />
			<HueSlider />
		</ColorPicker>
	);
};
