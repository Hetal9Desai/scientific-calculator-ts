"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const historyContainer = document.getElementById("historyList");
    const clearBtn = document.getElementById("clearHistory");
    function loadHistory() {
        const history = JSON.parse(localStorage.getItem("calcHistory") || "[]");
        historyContainer.innerHTML = "";
        if (history.length === 0) {
            historyContainer.innerHTML = "<p>No history available.</p>";
        }
        else {
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
