import React, {useState, useEffect} from 'react';
import {Text, useInput, useApp} from 'ink';

export const Counter = () => {
	const [counter, setCounter] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCounter(previousCounter => previousCounter + 1);
		}, 100);

		return () => {
			clearInterval(timer);
		};
	}, []);

	return <Text color="green">{counter} tests passed</Text>;
	//TODO: USE useInput to quit on q, useApp to exit cleanly
};

export const UserInput = () => {

	const {exit} = useApp();

	useInput((input) => {
		if (input === 'q') exit();
	});

	return <Text>Press q to quit</Text>;
}
