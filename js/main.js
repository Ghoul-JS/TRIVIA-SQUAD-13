

function getQuestions() {
    const cuestionNumbers = document.getElementById('question-numbers').value;
    const typeCategory = document.getElementById('select-category').value;

    fetch(`https://opentdb.com/api.php?amount=${cuestionNumbers}&category=${typeCategory}&difficulty=hard&type=multiple`)
        .then( response => response.json() )
        .then( data => printCards(data.results) )
}

// function printCategory(getCategory) {
//     const tCategory = document.getElementById('form-category');
//     tCategory.innerHTML = '';

//     getCategory.forEach( selectCategory => {
//         const category = `<div class="form-group">
//                             <label for="exampleFormControlSelect1">Categoría</label>
//                             <select class="form-control" id="exampleFormControlSelect1">
//                             <option>${selectCategory.category}</option>
//                             </select>
//                         </div>`;
//         tCategory.innerHTML += category;
//     })
    
// }


function printCards(questions) {
    const container = document.getElementById('container-card');
    container.innerHTML = '';

    questions.forEach( question => {
        const row = cardHTML(question);
        container.innerHTML += row;
    });
}

function cardHTML(ques) {

    const card = `<div class="card"">
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