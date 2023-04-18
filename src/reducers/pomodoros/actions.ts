import { Pomodoro } from './reducer';

export enum ActionTypes {
  ADD_NEW_POMODORO = 'ADD_NEW_POMODORO',
  INTERRUPT_POMODORO = 'INTERRUPT_POMODORO',
  FINISHED_POMODORO = 'FINISHED_POMODORO',
}

export function createNewPomodoroAction(newPomodoro: Pomodoro) {
  return {
    type: ActionTypes.ADD_NEW_POMODORO,
    payload: {
      newPomodoro,
    },
  };
}

export function interruptPomodoroAction(activePomodoroId: string) {
  return {
    type: ActionTypes.INTERRUPT_POMODORO,
    payload: {
      activePomodoroId,
    },
  };
}

export function finishedPomodoroAction(activePomodoroId: string) {
  return {
    type: ActionTypes.FINISHED_POMODORO,
    payload: {
      activePomodoroId,
    },
  };
}
