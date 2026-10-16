const commandForm = document.querySelector("#terminal-form");
const commandInput = document.querySelector("#terminal-input");
const commandOutput = document.querySelector("#terminal-output");

commandForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const command = commandInput.value.trim();
  const openCommand = command.match(/^open\s+(.+)$/i);

  if (!openCommand) {
    commandOutput.textContent = 'Unbekannter Befehl. Verwenden Sie: open <Dateiname>';
    commandOutput.className = "terminal-output terminal-error";
    return;
  }

  const pageName = openCommand[1].trim().replace(/\.html$/i, "").trim();
  if (!pageName || /[\\/]/.test(pageName)) {
    commandOutput.textContent = "Bitte geben Sie nur den Dateinamen ohne Ordnerpfad ein.";
    commandOutput.className = "terminal-output terminal-error";
    return;
  }

  commandOutput.textContent = `Suche ${pageName}...`;
  commandOutput.className = "terminal-output terminal-success";

  fetch(new URL("pages.json", document.baseURI))
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Seitenkatalog konnte nicht geladen werden (${response.status}).`);
      }
      return response.json();
    })
    .then((catalog) => {
      if (!Array.isArray(catalog.pages)) {
        throw new Error("Der Seitenkatalog hat ein ungültiges Format.");
      }

      const matches = catalog.pages.filter((path) => {
        if (typeof path !== "string" || !path.toLowerCase().endsWith(".html")) {
          return false;
        }
        const fileName = path.split("/").pop().replace(/\.html$/i, "");
        return fileName.toLowerCase() === pageName.toLowerCase();
      });

      if (matches.length === 0) {
        commandOutput.textContent = `Keine HTML-Datei namens "${pageName}" gefunden. Ergänzen Sie sie in HTML/pages.json.`;
        commandOutput.className = "terminal-output terminal-error";
        return;
      }

      if (matches.length > 1) {
        commandOutput.textContent = `Der Name "${pageName}" ist mehrdeutig. Bitte benennen Sie die Dateien eindeutig.`;
        commandOutput.className = "terminal-output terminal-error";
        return;
      }

      window.location.assign(new URL(matches[0], document.baseURI));
    })
    .catch((error) => {
      commandOutput.textContent = error.message || "Der Seitenkatalog konnte nicht geladen werden.";
      commandOutput.className = "terminal-output terminal-error";
    });
});