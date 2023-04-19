import { useContext } from 'react';

import { formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { PomodoroContext } from '@contexts/PomodoroContext';

import { HistoryContainer, HistoryList, TaskStatus } from './styles';

export function History() {
  const { pomodoros } = useContext(PomodoroContext);

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {pomodoros.map((pomodoro) => (
              <tr key={pomodoro.id}>
                <td>{pomodoro.task}</td>
                <td>{pomodoro.minutesAmount} minutos</td>
                <td>
                  {formatDistanceToNow(new Date(pomodoro.startDate), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </td>
                <td>
                  {pomodoro.finishedDate && <TaskStatus status="completed">Concluído</TaskStatus>}
                  {pomodoro.interruptedDate && <TaskStatus status="interrupted">Interrompido</TaskStatus>}
                  {!pomodoro.finishedDate && !pomodoro.interruptedDate && <TaskStatus status="progress">Em andamento</TaskStatus>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}
