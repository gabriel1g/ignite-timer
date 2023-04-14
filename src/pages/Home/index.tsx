import { createContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import * as zod from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { Pause, Play } from '@phosphor-icons/react';

import { Countdown } from './components/Countdown';
import { NewPomodoroForm } from './components/NewPomodoroForm';
import { HomeContainer, StartCountdownButton, StopCountdownButton } from './styles';

type PomodoroFormData = zod.infer<typeof pomodoroValidationSchema>;

interface Pomodoro {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface PomodoroContextProps {
  activePomodoro: Pomodoro | undefined;
  activePomodoroId: string | null;
  setActivePomodoroId: (id: string | null) => void;
  handleFinishPomodoro: () => void;
}

export const PomodoroContext = createContext({} as PomodoroContextProps);

const pomodoroValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe o nome do evento'),
  minutesAmount: zod.number().min(5, 'A duração precisa ter no mínimo 5 minutos').max(60, 'A duração só pode ter no máximo 60 minutos'),
});

export function Home() {
  const newPomodoroForm = useForm<PomodoroFormData>({
    defaultValues: { task: '', minutesAmount: 5 },
    resolver: zodResolver(pomodoroValidationSchema),
  });

  const [activePomodoroId, setActivePomodoroId] = useState<string | null>(null);
  const [pomodoros, setPomodoros] = useState<Pomodoro[]>([]);

  const { handleSubmit, watch, reset } = newPomodoroForm;

  const activePomodoro = pomodoros.find((pomodoro) => pomodoro.id === activePomodoroId);
  const isSubmitDisabled = !watch('task');

  function handleCreateNewPomodoro(data: PomodoroFormData) {
    const newPomodoro: Pomodoro = {
      id: String(new Date().getTime()),
      ...data,
      startDate: new Date(),
    };

    setPomodoros((prevState) => [...prevState, newPomodoro]);
    setActivePomodoroId(newPomodoro.id);

    reset();
  }

  function handleInterruptPomodoro() {
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

  function handleFinishPomodoro() {
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
    <PomodoroContext.Provider value={{ activePomodoro, activePomodoroId, setActivePomodoroId, handleFinishPomodoro }}>
      <HomeContainer>
        <form onSubmit={handleSubmit(handleCreateNewPomodoro)}>
          <FormProvider {...newPomodoroForm}>
            <NewPomodoroForm />
          </FormProvider>

          <Countdown />

          {activePomodoro ? (
            <StopCountdownButton onClick={handleInterruptPomodoro}>
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
    </PomodoroContext.Provider>
  );
}
