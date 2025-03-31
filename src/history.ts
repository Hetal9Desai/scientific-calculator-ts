export const CalcHistory = (function () {
  let history: unknown[] = JSON.parse(
    localStorage.getItem("calcHistory") || "[]"
  );
  const maxSize: number = 15;

  function save(entry: unknown): void {
    if (history.length >= maxSize) {
      history.shift();
    }
    history.push(entry);
    localStorage.setItem("calcHistory", JSON.stringify(history));
  }

  return { save };
})();
