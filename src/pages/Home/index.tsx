import { Play } from '@phosphor-icons/react';

import { CountdownButton, CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, TaskInput } from './styles';

export function Home() {
  return (
    <HomeContainer>
      <form>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput id="task" placeholder="Dê um nome para o seu projeto" type="text" />

          <label htmlFor="amountMinutes">durante</label>
          <MinutesAmountInput id="amountMinutes" placeholder="00" type="number" />

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
