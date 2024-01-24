export const millisecondsToMinutes = (time: number): number => {
	return Math.floor((time / (1000 * 60)) % 60);
};

export const millisecondsToSeconds = (time: number): number => {
	let seconds = Math.floor((time / 1000) % 60);

	if (seconds === 60) {
		seconds = 0;
	}

	return seconds;
};
