export function convertDurationToTimeString(duration: number) {
  const hours = Math.floor(duration / 3600); // 3600 = 60*60 => pegando as horas
  const minutes = Math.floor((duration % 3600) / 60); // pegando o resto da divisão e assim sabemos quantos minutos
  const seconds = Math.floor(duration / 60);

  const timeString = [hours, minutes, seconds]
    // percorrendo o array, utilizando o map, e para cada uma dessas unidades vou converter ela para string para colocar sempre 2 digitos
    .map((unit) => String(unit).padStart(2, "0"))
    .join(":");
  return timeString;
}
