const listEl = document.getElementById("list");
const consoleEl = document.getElementById("console");
const resultEl = document.getElementById("result");

const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const clearBtn = document.getElementById("clear");

let selectedScript = null;
let lastLine = "";

["log", "warn", "error"].forEach(type => {
  const orig = console[type];
  console[type] = (...args) => {
    const text = args.map(a =>
      typeof a === "object" ? JSON.stringify(a) : String(a)
    ).join(" ");

    lastLine = `[${type}] ${text}`;

    orig(...args);
    consoleEl.textContent += lastLine + "\n";
    resultEl.textContent = lastLine;
  };
});

fetch("/api/scripts")
  .then(r => r.json())
  .then(files => {
    files.forEach(file => {
      const li = document.createElement("li");

      const btn = document.createElement("button");
      btn.className = "script-item";
      btn.innerHTML = `
        <span class="script-name">${file}</span>
        <span class="pill">.js</span>
      `;

      btn.onclick = () => {
        selectedScript = file;
        setActiveButton(btn);
      };

      li.appendChild(btn);
      listEl.appendChild(li);
    });
  });

function setActiveButton(activeBtn) {
  document.querySelectorAll("#list button").forEach(b => {
    b.classList.toggle("active", b === activeBtn);
  });
}

startBtn.onclick = () => {
  if (!selectedScript) return;

  stop();

  consoleEl.textContent += `\n▶ ${selectedScript}\n`;
  resultEl.textContent = "";

  const s = document.createElement("script");
  s.id = "runner";
  s.src = `/script?name=${selectedScript}&t=${Date.now()}`;
  document.body.appendChild(s);
};

stopBtn.onclick = stop;

function stop() {
  const old = document.getElementById("runner");
  if (old) old.remove();
}

clearBtn.onclick = () => {
  consoleEl.textContent = "";
  resultEl.textContent = "";
};
