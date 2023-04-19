import { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import * as zod from 'zod';

import { PomodoroContext } from '@contexts/PomodoroContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pause, Play } from '@phosphor-icons/react';

import { Countdown } from './components/Countdown';
import { NewPomodoroForm } from './components/NewPomodoroForm';
import { HomeContainer, StartCountdownButton, StopCountdownButton } from './styles';

type PomodoroFormData = zod.infer<typeof pomodoroValidationSchema>;

const pomodoroValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe o nome do evento'),
  minutesAmount: zod.number().min(5, 'A duração precisa ter no mínimo 5 minutos').max(60, 'A duração só pode ter no máximo 60 minutos'),
});

export function Home() {
  const newPomodoroForm = useForm<PomodoroFormData>({
    defaultValues: { task: '', minutesAmount: 5 },
    resolver: zodResolver(pomodoroValidationSchema),
  });

  const { activePomodoro, createNewPomodoro, interruptPomodoro } = useContext(PomodoroContext);
  const { handleSubmit, watch, reset } = newPomodoroForm;

  const isSubmitDisabled = !watch('task');

  function handleCreateNewPomodoro(data: PomodoroFormData) {
    createNewPomodoro(data);
    reset();
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewPomodoro)}>
        <FormProvider {...newPomodoroForm}>
          <NewPomodoroForm />
        </FormProvider>

        <Countdown />

        {activePomodoro ? (
          <StopCountdownButton onClick={interruptPomodoro}>
            <Pause size={24} />
            Finalizar
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
