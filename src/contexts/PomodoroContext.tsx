import { ReactNode, createContext, useReducer, useState } from 'react';

import { Pomodoro, pomodorosReducer } from '@reducers/pomodoros';

interface PomodoroCreationData {
  task: string;
  minutesAmount: number;
}

interface PomodoroContextProps {
  pomodoros: Pomodoro[];
  activePomodoro: Pomodoro | undefined;
  activePomodoroId: string | null;
  createNewPomodoro: (data: PomodoroCreationData) => void;
  interruptPomodoro: () => void;
  finishedPomodoro: () => void;
}

interface PomodoroContextProviderProps {
  children: ReactNode;
}

export const PomodoroContext = createContext({} as PomodoroContextProps);

export function PomodoroContextProvider({ children }: PomodoroContextProviderProps) {
  const [pomodorosState, dispatch] = useReducer(pomodorosReducer, { pomodoros: [], activePomodoroId: null });

  const { pomodoros, activePomodoroId } = pomodorosState;

  const activePomodoro = pomodoros.find((pomodoro) => pomodoro.id === activePomodoroId);

  function createNewPomodoro(data: PomodoroCreationData) {
    const newPomodoro: Pomodoro = {
      id: String(new Date().getTime()),
      ...data,
      startDate: new Date(),
    };

    dispatch({
      type: 'ADD_NEW_POMODORO',
      payload: {
        newPomodoro,
      },
    });
  }

  function interruptPomodoro() {
    dispatch({
      type: 'INTERRUPT_POMODORO',
      payload: {
        activePomodoroId,
      },
    });
  }

  function finishedPomodoro() {
    dispatch({
      type: 'FINISHED_POMODORO',
      payload: {
        activePomodoroId,
      },
    });
  }

  return (
    <PomodoroContext.Provider
      value={{ pomodoros, activePomodoro, activePomodoroId, createNewPomodoro, interruptPomodoro, finishedPomodoro }}
    >
      {children}
    </PomodoroContext.Provider>
  );
}
