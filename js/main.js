
function getQuestions() {
    const cuestionNumbers = document.getElementById('question-numbers').value;
    const typeCategory = document.getElementById('select-category').value;
    const typeDifficulty = document.getElementById('diff').value;
    const selectType = document.getElementById('select-type').value;

    fetch(`https://opentdb.com/api.php?amount=${cuestionNumbers}&category=${typeCategory}&difficulty=${typeDifficulty}&type=${selectType}`)
        .then( response => response.json() )
        .then( data => printCards(data.results) )
}

function getCategories() {

    fetch(`https://opentdb.com/api_category.php`)
        .then(response => response.json())
        .then( data => printCategory(data.trivia_categories))   
}

getCategories();

function printCategory(getCategories) {
    const tCategory = document.getElementById('select-category');
    tCategory.innerHTML = '';

    getCategories.forEach( selectCategory => {
        const category = returnCategory(selectCategory)
        tCategory.innerHTML += category;
    })  
}

function returnCategory(getCategory) {
    const options = `<option value="${getCategory.id}">${getCategory.name}</option>`;
    return options;
} 


function printCards(questions) {
    const container = document.getElementById('container-card');
    container.innerHTML = '';

    questions.forEach( question => {
        const row = cardHTML(question);
        container.innerHTML += row;
    });
}

function cardHTML(ques) {

    const card = `<div class="card mb-3">
                        <div class="card-body">
                        <h5 class="card-title">${ques.category}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${ques.question}</h6>
                        ${answeres(ques.correct_answer, ques.incorrect_answers)}
                        </div>
                 </div>`;
    return card;
}

function answeres(correct, incorrects) {
    const correctRBTN = `<div class="form-check">
                            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1">
                            <label class="form-check-label" for="exampleRadios1">
                            ${correct}
                            </label>
                        </div>`;  

    let incorrectRBTN = '';

    incorrects.forEach( incorrect => {
        incorrectRBTN += `<div class="form-check">
                            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1">
                            <label class="form-check-label" for="exampleRadios1">
                            ${incorrect}
                            </label>
                        </div>`;
    })
    return correctRBTN + incorrectRBTN;
}