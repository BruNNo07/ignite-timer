import { HistoryConteiner, HistoryList, Status } from "./styles";

export function History() {
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
                        <tr>
                            <td>Tarefa</td>
                            <td>20 min</td>
                            <td>a 2 meses</td>
                            <td>
                                <Status statusColor="green">Concluído</Status>
                            </td>
                        </tr>
                        <tr>
                            <td>Tarefa</td>
                            <td>20 min</td>
                            <td>a 2 meses</td>
                            <td>
                                <Status statusColor="red">Cancelado</Status>
                            </td>
                        </tr>
                        <tr>
                            <td>Tarefa</td>
                            <td>20 min</td>
                            <td>a 2 meses</td>
                            <td>
                                <Status statusColor="yellow">Em andamento</Status>
                            </td>
                        </tr>
                        <tr>
                            <td>Tarefa</td>
                            <td>20 min</td>
                            <td>a 2 meses</td>
                            <td>
                                <Status statusColor="green">Concluído</Status>
                            </td>
                        </tr>
                        <tr>
                            <td>Tarefa</td>
                            <td>20 min</td>
                            <td>a 2 meses</td>
                            <td>
                                <Status statusColor="green">Concluído</Status>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </HistoryList>
        </HistoryConteiner>
    )
}