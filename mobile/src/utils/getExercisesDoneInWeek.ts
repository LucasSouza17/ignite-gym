import { HistoryByDayDTO } from "@dtos/HistoryByDayDTO";
import moment from "moment";

export function getExercisesDoneInWeek(historyByDay: HistoryByDayDTO[]) {
  // Obtém a data atual
  const dataAtual = moment();

  // Define a data de início da semana (segunda-feira)
  const dataInicioSemana = dataAtual.clone().startOf("isoWeek");

  // Define a data de término da semana (domingo)
  const dataFimSemana = dataAtual.clone().endOf("isoWeek");

  // Função para verificar se a data de um exercício está dentro da semana
  function dataEstaNaSemana(historyByDay: HistoryByDayDTO) {
    const dataExercicio = moment(historyByDay.title, "DD/MM/YYYY");
    return dataExercicio.isBetween(dataInicioSemana, dataFimSemana, null, "[]"); // "[]" inclui as datas de início e término
  }

  // Filtrar exercícios que estão dentro da semana
  const exerciciosSemana = historyByDay.filter(dataEstaNaSemana);

  // Calcular o total de exercícios feitos na semana
  let totalExercicios = 0;

  exerciciosSemana.forEach((exercicio: HistoryByDayDTO) => {
    totalExercicios += exercicio.data.length;
  });

  return totalExercicios;
}
