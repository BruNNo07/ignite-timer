import { formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { useContext } from "react";
import { CyclesContext } from "../../contexts/CyclesContexts";
import { HistoryConteiner, HistoryList, Status } from "./styles";

export function History() {
    const { cycles } = useContext(CyclesContext)
    return (
        <HistoryConteiner>
            <h1>Meu Historico</h1>

            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Tafefa</th>
                            <th>Duração</th>
                            <th>Inicio</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cycles.map((cycle) => {
                            return(
                            <tr key={cycle.id}>
                                <td>{cycle.task}</td>
                                <td>{cycle.minutesAmount} minutos</td>
                                <td>{formatDistanceToNow(cycle.startDate,{
                                    addSuffix: true,
                                    locale: ptBR
                                })}</td>
                                <td>
                                    {cycle.finishedDate && <Status statusColor="green">Concluído</Status>}
                                    {cycle.interruptedDate && <Status statusColor="red">Interrompido</Status>}
                                    {!cycle.finishedDate && !cycle.interruptedDate && <Status statusColor="yellow">Em Andamento</Status>}
                                </td>
                            </tr>
                            )
                        })}                      
                    </tbody>
                </table>
            </HistoryList>
        </HistoryConteiner>
    )
}