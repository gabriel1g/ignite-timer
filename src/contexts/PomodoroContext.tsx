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

interface PomodorosState {
  pomodoros: Pomodoro[];
  activePomodoroId: string | null;
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
  const [pomodorosState, dispatch] = useReducer(
    (state: PomodorosState, action: any) => {
      switch (action.type) {
        case 'ADD_NEW_POMODORO':
          return {
            ...state,
            pomodoros: [...state.pomodoros, action.payload.newPomodoro],
            activePomodoroId: action.payload.newPomodoro.id,
          };
        case 'INTERRUPT_POMODORO':
          return {
            ...state,
            pomodoros: state.pomodoros.map((pomodoro) => {
              if (pomodoro.id === action.payload.activePomodoroId) {
                return { ...pomodoro, interruptedDate: new Date() };
              } else {
                return pomodoro;
              }
            }),
            activePomodoroId: null,
          };
        case 'FINISHED_POMODORO':
          return {
            ...state,
            pomodoros: state.pomodoros.map((pomodoro) => {
              if (pomodoro.id === action.payload.activePomodoroId) {
                return { ...pomodoro, finishedDate: new Date() };
              } else {
                return pomodoro;
              }
            }),
            activePomodoroId: null,
          };
        default:
          return state;
      }
    },
    { pomodoros: [], activePomodoroId: null } as PomodorosState
  );

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
