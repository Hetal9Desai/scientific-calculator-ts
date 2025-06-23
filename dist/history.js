export const CalcHistory = (function () {
    let history = JSON.parse(localStorage.getItem("calcHistory") || "[]");
    const maxSize = 15;
    function save(entry) {
        if (history.length >= maxSize) {
            history.shift();
        }
        history.push(entry);
        localStorage.setItem("calcHistory", JSON.stringify(history));
    }
    return { save };
})();
