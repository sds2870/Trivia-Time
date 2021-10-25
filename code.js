const triviaUrl = "https://opentdb.com/api.php?amount=10&type=multiple"

async function getTrivia() {
    let response = await fetch(triviaUrl);
    let data = await response.json();
    return data
}

function shuffleArray(array) {
    for (let index = array.length - 1; index >= 0; index -= 1) {
        const shuffleElement = Math.floor(Math.random() * (index + 1));
        [array[index], array[shuffleElement]] = [array[shuffleElement], array[index]]
    }
}


getTrivia().then((data) => {
    console.log(data)
    const results = data.results[0]
    document.getElementById("question").innerHTML = results.question;   
    document.getElementById("category").innerHTML = results.category;
    
    const answers = [...results.incorrect_answers, results.correct_answer];
    shuffleArray(answers);
    for (let index = 0; index < 4; index += 1) {
        let thisIndex = index + 1;
        document.getElementById(`choice${thisIndex}label`).innerHTML = answers[index]
        document.getElementById(`choice${thisIndex}`).value = answers[index]
        console.log(index)
    }

    document.getElementById("display").style.display = "block";
    
    document.getElementById("guess").addEventListener("click", () => {
        document.querySelectorAll("input[name='choice']").forEach((el) => {
            const result = document.getElementById("result");
            if (el.checked) {
                if(el.value === results.correct_answer) {
                    result.innerHTML = "All Right! You Got It!"
                } else {
                    result.innerHTML = `Nope! The answer is ${results.correct_answer}`
                }
            }
        });
    });    
});

document.getElementById("new").addEventListener("click", () => {
    location.reload();
})
