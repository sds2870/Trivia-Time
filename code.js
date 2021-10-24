const triviaUrl = "https://opentdb.com/api.php?amount=10&type=multiple"

async function getTrivia() {
    let response = await fetch(triviaUrl);
    let data = await response.json();
    return data
}

function shuffleArray(array) {
    for (let index = array.length - 1; index >= 0; index--) {
        const shuffleElement = Math.floor(Math.random() * (index + 1));
        [array[index], array[shuffleElement]] = [array[shuffleElement], array[index]]
    }
}

getTrivia().then((data) => {
    console.log(data)
    const results = data.results[0]
    document.getElementById("question").innerHTML = results.question;   
    document.getElementById("category").innerHTML = results.category;

    const answers = [...results.incorrect_answers, results.correct_answer]
    shuffleArray(answers);
});

