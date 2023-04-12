import { useForm } from 'react-hook-form';

import * as zod from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { Play } from '@phosphor-icons/react';

import { CountdownButton, CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, TaskInput } from './styles';

type PomodoroFormData = zod.infer<typeof pomodoroValidationSchema>;

const pomodoroValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe o nome do evento'),
  minutesAmount: zod.number().min(5, 'A duração precisa ter no mínimo 5 minutos').max(60, 'A duração só pode ter no máximo 60 minutos'),
});

export function Home() {
  const { register, handleSubmit, watch } = useForm<PomodoroFormData>({
    defaultValues: { minutesAmount: 5 },
    resolver: zodResolver(pomodoroValidationSchema),
  });

  const isSubmitDisabled = !watch('task');

  function handleCreateNewPomodoro(data: PomodoroFormData) {
    console.log(data);
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewPomodoro)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput id="task" list="tasks-suggestions" placeholder="Dê um nome para o seu projeto" type="text" {...register('task')} />

          <datalist id="tasks-suggestions">
            <option value="Task 1" />
            <option value="Task 2" />
            <option value="Task 3" />
            <option value="Task 4" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
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

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <span className="separator">:</span>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <CountdownButton disabled={isSubmitDisabled}>
          <Play size={24} />
          Começar
        </CountdownButton>
      </form>
    </HomeContainer>
  );
}
