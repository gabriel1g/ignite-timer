import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { PomodoroContext } from '@contexts/PomodoroContext';

import { FormContainer, MinutesAmountInput, TaskInput } from './styles';

export function NewPomodoroForm() {
  const { activePomodoro } = useContext(PomodoroContext);
  const { register } = useFormContext();

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        disabled={!!activePomodoro}
        id="task"
        list="tasks-suggestions"
        placeholder="Dê um nome para o seu projeto"
        type="text"
        {...register('task')}
      />

      <datalist id="tasks-suggestions">
        <option value="Task 1" />
        <option value="Task 2" />
        <option value="Task 3" />
        <option value="Task 4" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        disabled={!!activePomodoro}
        id="minutesAmount"
        max={60}
        min={5}
        placeholder="00"
        step={5}
        type="number"
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  );
}
