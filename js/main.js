const UserInput = document.getElementById("UserInput");
const Searchbutton = document.getElementById("Searchbutton");
const ResultsSection = document.getElementById("results");

async function Wikipedia(UserInput) {
  const url = `https://fr.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(UserInput)}&utf8=&format=json&origin=*`;

  try {
    const output = await fetch(url);
    const data = await output.json();
    const WikipediaResults = data.query.search;
    return WikipediaResults;

  } catch (error) {
    console.error('Erreur Wikipédia :', error);
  }
}

async function YTB(UserInput) {
    //const api = '<API_KEY>';
    const url ='https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + encodeURIComponent(UserInput) + '&key=' + api + '&maxResults=5&type=video';
    try {
        const output = await fetch(url);
        const data = await output.json();
        const YTBResults = data.items;
        return YTBResults;

    } catch (error) {
        console.error('Erreur YouTube :', error);
    }
}

async function displayResults(results) {
    ResultsSection.innerHTML = '';
    const wikipediaResults = results[0] || [];
    const youtubeResults = results[1] || [];
    const maxResults = Math.max(
        wikipediaResults.length,
        youtubeResults.length
    );
    for (let i = 0; i < maxResults; i++) {
        if (wikipediaResults[i]) {
            const resultDiv = document.createElement('div');
            resultDiv.classList.add('result', 'wikipedia');
            resultDiv.textContent = wikipediaResults[i].title;
            ResultsSection.appendChild(resultDiv);
        }
        if (youtubeResults[i]) {
            const resultDiv = document.createElement('div');
            resultDiv.classList.add('result', 'youtube');
            resultDiv.textContent = youtubeResults[i].snippet?.title || 'No title available';
            ResultsSection.appendChild(resultDiv);
        }
    }
}

Searchbutton.addEventListener("click", async () => {
    const userInputValue = UserInput.value.trim();
    const SearchResults = [];
    if (userInputValue) {
        SearchResults.push(await Wikipedia(userInputValue));
        //SearchResults.push(await YTB(userInputValue));
        await displayResults(SearchResults);

    } else {
    console.log("No input provided.");
    }
});