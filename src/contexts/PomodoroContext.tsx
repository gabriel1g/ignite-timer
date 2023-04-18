import { ReactNode, createContext, useEffect, useReducer } from 'react';

import { createNewPomodoroAction, finishedPomodoroAction, interruptPomodoroAction } from '@reducers/pomodoros/actions';
import { Pomodoro, pomodorosReducer } from '@reducers/pomodoros/reducer';

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
  const [pomodorosState, dispatch] = useReducer(pomodorosReducer, { pomodoros: [], activePomodoroId: null }, (initialState) => {
    const storedStateAsJSON = localStorage.getItem('@ignite-timer:pomodoros-storage');

    if (storedStateAsJSON) {
      return JSON.parse(storedStateAsJSON);
    } else {
      return initialState;
    }
  });

  const { pomodoros, activePomodoroId } = pomodorosState;

  const activePomodoro = pomodoros.find((pomodoro) => pomodoro.id === activePomodoroId);

  function createNewPomodoro(data: PomodoroCreationData) {
    const newPomodoro: Pomodoro = {
      id: String(new Date().getTime()),
      ...data,
      startDate: new Date(),
    };

    dispatch(createNewPomodoroAction(newPomodoro));
  }

  function interruptPomodoro() {
    dispatch(interruptPomodoroAction(activePomodoroId));
  }

  function finishedPomodoro() {
    dispatch(finishedPomodoroAction(activePomodoroId));
  }

  useEffect(() => {
    const stateJSON = JSON.stringify(pomodorosState);

    localStorage.setItem('@ignite-timer:pomodoros-storage', stateJSON);
  }, [pomodorosState]);

  return (
    <PomodoroContext.Provider
      value={{ pomodoros, activePomodoro, activePomodoroId, createNewPomodoro, interruptPomodoro, finishedPomodoro }}
    >
      {children}
    </PomodoroContext.Provider>
  );
}
