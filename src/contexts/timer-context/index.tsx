import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';
import { millisecondsToMinutes, millisecondsToSeconds } from '~/utils/time';

interface TimerProviderProps {
	children: ReactNode;
}

interface TimerContextValue {
	initialTime: number;
	setInitialTime: Dispatch<SetStateAction<number>>;
	timer: number;
	setTimer: Dispatch<SetStateAction<number>>;
	isPaused: boolean;
	setIsPaused: Dispatch<SetStateAction<boolean>>;
	completedPercentage: number;
	setCompletedPercentage: Dispatch<SetStateAction<number>>;
	hasFinished: boolean;
	minutes: number;
	seconds: number;
	handleResetTimer: () => void;
	handlePauseOrResumeTimer: () => void;
}

const TimerContext = createContext<TimerContextValue>({} as TimerContextValue);

export const TimerProvider = ({ children }: TimerProviderProps) => {
	const [initialTime, setInitialTime] = useState<number>(0);
	const [timer, setTimer] = useState<number>(0);
	const [isPaused, setIsPaused] = useState<boolean>(true);
	const [completedPercentage, setCompletedPercentage] = useState<number>(0);

	const hasFinished = timer <= 0 && completedPercentage === 100;
	const minutes = millisecondsToMinutes(timer);
	const seconds = millisecondsToSeconds(timer);

	let remainingPercentage = 100;
	if (initialTime > 0) {
		remainingPercentage = Math.floor((100 * timer) / initialTime);
	}

	const handleResetTimer = () => {
		setIsPaused(true);
		setTimer(initialTime);
	};

	const handlePauseOrResumeTimer = () => {
		if (timer > 0) {
			setIsPaused((prevState) => !prevState);
		}
	};

	useEffect(() => {
		if (isNaN(remainingPercentage)) return;

		setCompletedPercentage(100 - remainingPercentage);
	}, [remainingPercentage]);

	useEffect(() => {
		handleResetTimer();
	}, [initialTime]);

	useEffect(() => {
		if (timer <= 0 || isPaused) return;

		const timeout = setTimeout(() => {
			setTimer((prevState) => prevState - 1000);
		}, 1000);

		return () => {
			clearTimeout(timeout);
		};
	}, [timer, isPaused, completedPercentage]);

	return (
		<TimerContext.Provider
			value={{
				initialTime,
				setInitialTime,
				timer,
				setTimer,
				isPaused,
				setIsPaused,
				completedPercentage,
				setCompletedPercentage,
				hasFinished,
				minutes,
				seconds,
				handleResetTimer,
				handlePauseOrResumeTimer,
			}}
		>
			{children}
		</TimerContext.Provider>
	);
};

export const useTimer = () => {
	const context = useContext(TimerContext);

	if (Object.keys(context).length) {
		return context;
	}

	throw 'Trying to use useTimer outside of provider';
};