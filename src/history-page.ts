document.addEventListener("DOMContentLoaded", () => {
  const historyContainer = document.getElementById(
    "historyList"
  ) as HTMLElement;
  const clearBtn = document.getElementById("clearHistory") as HTMLElement;

  function loadHistory(): void {
    const history: string[] = JSON.parse(
      localStorage.getItem("calcHistory") || "[]"
    );
    historyContainer.innerHTML = "";
    if (history.length === 0) {
      historyContainer.innerHTML = "<p>No history available.</p>";
    } else {
      history.forEach((entry) => {
        const div = document.createElement("div");
        div.classList.add("history-item");
        div.textContent = entry;
        historyContainer.appendChild(div);
      });
    }
  }

  loadHistory();

  clearBtn.addEventListener("click", () => {
    localStorage.removeItem("calcHistory");
    loadHistory();
  });
});
