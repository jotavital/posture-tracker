import { Vibration } from 'react-native';

export const vibrateDevice = () => {
	Vibration.vibrate([500, 500], true);
};

export const cancelVibration = () => {
	Vibration.cancel();
};
