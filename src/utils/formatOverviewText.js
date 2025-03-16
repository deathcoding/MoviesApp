export default function formatOverviewText(text, maxLength = 100) {
  if (text === "") {
    return "No overview";
  }
  if (text.length <= maxLength) {
    // Если текст уже короткий, возвращаем его без изменений
    return text;
  }
  // Обрезаем текст до нужной длины (но возможно на середине слова)
  let truncated = text.substring(0, maxLength);

  // Ищем последний пробел в обрезанной строке
  let lastSpace = truncated.lastIndexOf(" ");

  if (lastSpace !== -1) {
    // Если пробел найден, обрезаем по нему (чтобы не оборвать слово)
    return truncated.substring(0, lastSpace) + "...";
  } else {
    // Если пробела нет (например, одно длинное слово), просто добавляем "..."
    return truncated + "...";
  }
}
