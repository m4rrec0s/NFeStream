export const dateConverter = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }
  return new Date(date).toLocaleDateString("pt-BR", options)
}
