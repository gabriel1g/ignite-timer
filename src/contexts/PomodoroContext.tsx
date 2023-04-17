import { ReactNode, createContext, useReducer, useState } from 'react';

interface PomodoroCreationData {
  task: string;
  minutesAmount: number;
}

interface Pomodoro {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface PomodoroContextProps {
  pomodoros: Pomodoro[];
  activePomodoro: Pomodoro | undefined;
  activePomodoroId: string | null;
  setActivePomodoroId: (id: string | null) => void;
  createNewPomodoro: (data: PomodoroCreationData) => void;
  interruptPomodoro: () => void;
  finishedPomodoro: () => void;
}

interface PomodoroContextProviderProps {
  children: ReactNode;
}

export const PomodoroContext = createContext({} as PomodoroContextProps);

export function PomodoroContextProvider({ children }: PomodoroContextProviderProps) {
  const [activePomodoroId, setActivePomodoroId] = useState<string | null>(null);
  const [pomodoros, dispatch] = useReducer((state: Pomodoro[], action: any) => {
    switch (action.type) {
      case 'ADD_NEW_POMODORO':
        return [...state, action.payload.newPomodoro];
      default:
        return state;
    }
  }, []);
  console.log(pomodoros);

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

    // setPomodoros((prevState) => [...prevState, newPomodoro]);
    setActivePomodoroId(newPomodoro.id);
  }

  function interruptPomodoro() {
    dispatch({
      type: 'INTERRUPT_POMODORO',
      payload: {
        activePomodoroId,
      },
    });

    // setPomodoros((prevState) =>
    //   prevState.map((pomodoro) => {
    //     if (pomodoro.id === activePomodoroId) {
    //       return { ...pomodoro, interruptedDate: new Date() };
    //     } else {
    //       return pomodoro;
    //     }
    //   })
    // );
    setActivePomodoroId(null);
  }

  function finishedPomodoro() {
    dispatch({
      type: 'FINISHED_POMODORO',
      payload: {
        activePomodoroId,
      },
    });

    // setPomodoros((prevState) =>
    //   prevState.map((pomodoro) => {
    //     if (pomodoro.id === activePomodoroId) {
    //       return { ...pomodoro, finishedDate: new Date() };
    //     } else {
    //       return pomodoro;
    //     }
    //   })
    // );
  }

  return (
    <PomodoroContext.Provider
      value={{ pomodoros, activePomodoro, activePomodoroId, setActivePomodoroId, createNewPomodoro, interruptPomodoro, finishedPomodoro }}
    >
      {children}
    </PomodoroContext.Provider>
  );
}
