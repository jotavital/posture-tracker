import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';
import daydream from '~/assets/sounds/daydream.mp3';

export const useSound = () => {
	const [sound, setSound] = useState<Audio.Sound | undefined>();

	const playSound = async () => {
		const { sound } = await Audio.Sound.createAsync(daydream);
		setSound(sound);

		await sound.playAsync();
	};

	const stopSound = async () => {
		sound && sound.stopAsync();
	};

	useEffect(() => {
		return sound
			? () => {
					sound.unloadAsync();
				}
			: undefined;
	}, [sound]);

	return { stopSound, playSound };
};
