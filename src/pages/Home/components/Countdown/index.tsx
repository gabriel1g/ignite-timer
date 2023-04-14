import { useContext, useEffect, useState } from 'react';

import { differenceInSeconds } from 'date-fns';

import { PomodoroContext } from '@pages/Home';

import { CountdownContainer } from './styles';

export function Countdown() {
  const { activePomodoro, activePomodoroId, setActivePomodoroId, handleFinishPomodoro } = useContext(PomodoroContext);

  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0);

  const totalSeconds = activePomodoro ? activePomodoro.minutesAmount * 60 : 0;
  const currentSeconds = totalSeconds - amountSecondsPassed;
  const minutesAmountDisplay = String(Math.floor(currentSeconds / 60)).padStart(2, '0');
  const secondsAmountDisplay = String(currentSeconds % 60).padStart(2, '0');

  useEffect(() => {
    if (activePomodoro) {
      document.title = `${minutesAmountDisplay}:${secondsAmountDisplay}`;
    }
  }, [activePomodoro, minutesAmountDisplay, secondsAmountDisplay]);

  useEffect(() => {
    if (activePomodoro) {
      var interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(new Date(), activePomodoro.startDate);

        if (secondsDifference >= totalSeconds) {
          handleFinishPomodoro();

          clearInterval(interval);
          setActivePomodoroId(null);
        } else {
          setAmountSecondsPassed(secondsDifference);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
      setAmountSecondsPassed(0);
    };
  }, [activePomodoro, totalSeconds, activePomodoroId]);

  return (
    <CountdownContainer>
      <span>{minutesAmountDisplay[0]}</span>
      <span>{minutesAmountDisplay[1]}</span>
      <span className="separator">:</span>
      <span>{secondsAmountDisplay[0]}</span>
      <span>{secondsAmountDisplay[1]}</span>
    </CountdownContainer>
  );
}
