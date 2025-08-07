async function searchWord() {
  const word = document.getElementById("WordInput").value.trim();
  const resultBox = document.getElementById("result");
  const spinner = document.getElementById("spinner");

  if (!word) {
    resultBox.innerHTML = `<p>Please enter a word.</p>`;
    resultBox.classList.remove("hidden");
    spinner.classList.add("hidden");
    return;
  }

  try {
    spinner.classList.remove("hidden");
    resultBox.classList.add("hidden");

    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();

    spinner.classList.add("hidden");
    resultBox.classList.remove("hidden");

    if (data.title === "No Definitions Found") {
      resultBox.innerHTML = `<p>No definitions found for "<strong>${word}</strong>".</p>`;
    } else {
      const meanings = data[0].meanings.map(meaning => {
        const def = meaning.definitions[0];
        return `
          <div class="meaning">
            <strong>Part of Speech:</strong> ${meaning.partOfSpeech}<br>
            <strong>Definition:</strong> ${def.definition}<br>
            ${def.example ? `<strong>Example:</strong> "${def.example}"<br>` : ""}
            ${def.synonyms?.length ? `<strong>Synonyms:</strong> ${def.synonyms.join(', ')}` : ""}
          </div>
        `;
      }).join("<hr>");

     resultBox.innerHTML = `
  <h2>Meaning of "<strong>${word}</strong>":</h2>
  ${meanings}
`;


      resultBox.scrollIntoView({ behavior: "smooth" });
    }
  } catch (error) {
    spinner.classList.add("hidden");
    resultBox.classList.remove("hidden");
    resultBox.innerHTML = `<p>Error fetching data. Please try again later.</p>`;
    console.error(error);
  }
}
