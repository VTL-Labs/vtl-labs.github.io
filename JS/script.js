const commandForm = document.querySelector("#terminal-form");
const commandInput = document.querySelector("#terminal-input");
const commandOutput = document.querySelector("#terminal-output");

commandForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const command = commandInput.value.trim();
  const openCommand = command.match(/^open\s+([a-zA-Z0-9_-]+(?:\.html)?)$/i);

  if (!openCommand) {
    commandOutput.textContent = 'Unbekannter Befehl. Verwenden Sie: open <Dateiname>';
    commandOutput.className = "terminal-output terminal-error";
    return;
  }

  const pageName = openCommand[1].replace(/\.html$/i, "");
  commandOutput.textContent = `Öffne ${pageName}...`;
  commandOutput.className = "terminal-output terminal-success";
  window.location.assign(new URL(`${encodeURIComponent(pageName)}.html`, window.location.href));
});