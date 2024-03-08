const formatter = new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
});

const binding = {
    clear: document.getElementById("clear"),
    undo: document.getElementById("undo"),
    scan: document.getElementById("scan"),
    save: document.getElementById("save"),
    list: document.getElementById("list"),
    scanner: document.getElementById("scanner"),
    close: document.getElementById("close"),
};

const html5QrCode = new Html5Qrcode("reader");

let data = [];

binding.clear.addEventListener("click", async ev => {
    data = [];
    updateList();
});

binding.undo.addEventListener("click", async e => {
    data.pop();
    updateList();
});

binding.scan.addEventListener("click", async e => {
    binding.scanner.classList.add("show");
    html5QrCode.start(
        {
            facingMode: "environment"
        },
        {
            fps: 10,
            qrbox: { width: 250, height: 250 }
        },
        (decodedText, decodedResult) => {
            let date = new Date();
            data.push({ date: date, text: decodedText });
            updateList();
            binding.close.click();
        },
        (errorMessage) => {
            console.log(errorMessage);
        });
});

binding.save.addEventListener("click", async e => {
    let csv = "Date,Time,Text\n" + data.reduce((a, x) => a += `${formatter.format(x.date)},${x.text}\n`, "");
    let blob = new Blob([csv], { type: "text/csv" });
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = "Data.csv";
    a.click();
    URL.revokeObjectURL(url);
});

binding.close.addEventListener("click", async e => {
    binding.scanner.classList.remove("show");
    html5QrCode.stop();
});

function updateList() {
    binding.list.innerHTML = "";
    for (let item of data) {
        let span = document.createElement("span");
        span.innerText = `${formatter.format(item.date)} | ${item.text}`;
        binding.list.append(span);
    }
}