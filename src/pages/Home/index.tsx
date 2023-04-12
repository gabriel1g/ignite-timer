import { Play } from '@phosphor-icons/react';

import { CountdownButton, CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, TaskInput } from './styles';

export function Home() {
  return (
    <HomeContainer>
      <form>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput id="task" list="tasks-suggestions" placeholder="Dê um nome para o seu projeto" type="text" />

          <datalist id="tasks-suggestions">
            <option value="Task 1" />
            <option value="Task 2" />
            <option value="Task 3" />
            <option value="Task 4" />
          </datalist>

          <label htmlFor="amountMinutes">durante</label>
          <MinutesAmountInput id="amountMinutes" max={60} min={5} placeholder="00" step={5} type="number" />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <span className="separator">:</span>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <CountdownButton>
          <Play size={24} />
          Começar
        </CountdownButton>
      </form>
    </HomeContainer>
  );
}
