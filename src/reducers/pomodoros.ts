export interface Pomodoro {
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

export function pomodorosReducer(state: PomodorosState, action: any) {
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
}
