import { ReactNode, createContext, useState } from 'react';

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
  finishPomodoro: () => void;
}

interface PomodoroContextProviderProps {
  children: ReactNode;
}

export const PomodoroContext = createContext({} as PomodoroContextProps);

export function PomodoroContextProvider({ children }: PomodoroContextProviderProps) {
  const [activePomodoroId, setActivePomodoroId] = useState<string | null>(null);
  const [pomodoros, setPomodoros] = useState<Pomodoro[]>([]);

  const activePomodoro = pomodoros.find((pomodoro) => pomodoro.id === activePomodoroId);

  function createNewPomodoro(data: PomodoroCreationData) {
    const newPomodoro: Pomodoro = {
      id: String(new Date().getTime()),
      ...data,
      startDate: new Date(),
    };

    setPomodoros((prevState) => [...prevState, newPomodoro]);
    setActivePomodoroId(newPomodoro.id);

    //reset();
  }

  function interruptPomodoro() {
    setPomodoros((prevState) =>
      prevState.map((pomodoro) => {
        if (pomodoro.id === activePomodoroId) {
          return { ...pomodoro, interruptedDate: new Date() };
        } else {
          return pomodoro;
        }
      })
    );

    setActivePomodoroId(null);
  }

  function finishPomodoro() {
    setPomodoros((prevState) =>
      prevState.map((pomodoro) => {
        if (pomodoro.id === activePomodoroId) {
          return { ...pomodoro, finishedDate: new Date() };
        } else {
          return pomodoro;
        }
      })
    );
  }

  return (
    <PomodoroContext.Provider
      value={{ pomodoros, activePomodoro, activePomodoroId, setActivePomodoroId, createNewPomodoro, interruptPomodoro, finishPomodoro }}
    >
      {children}
    </PomodoroContext.Provider>
  );
}
