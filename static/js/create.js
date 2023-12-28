let currentStep = 1;
let rowsCount = 0;
addResultRow(0, 25)
addResultRow(26, 50)
addResultRow(51, 75)
addResultRow(76, 100)
let questionCount = 0;
let ansvers_counts = {
}
addQuestion()

function start(){
    document.getElementById('testInfoPart').style.display = 'block';
        document.getElementById('resultsPart').style.display = 'none';
        document.getElementById('questionPart').style.display = 'none';
        currentStep --;
}

function nextStep() {
    document.getElementById('testInfoPart').style.display = 'none';
        document.getElementById('resultsPart').style.display = 'none';
        document.getElementById('questionPart').style.display = 'block';
    switch (currentStep){
        case 1: currentStep ++; break;
        case 3: currentStep --; break;
    }
}

function addQuestion() {
    let questionsSection = document.getElementById('questionsSection');

    questionCount++;
    ansvers_counts[String(questionCount)] = 2

    let questionBlock = document.createElement('div');
    questionBlock.classList.add('questionBlock');

    let questionTitle = document.createElement('div');
    questionTitle.classList.add('questionTitle');
    questionTitle.id = 'question_title_'+questionCount;
    questionTitle.textContent = `Вопрос ${questionCount}`;
    questionBlock.appendChild(questionTitle);

    let questionContent = document.createElement('div');
    questionContent.classList.add('questionContent');

    questionContent.id = "question_form_"+questionCount
    questionContent.innerHTML = `
        <input name="que_${questionCount}" type="text" id="question${questionCount}" class="question" oninput="oninp(${questionCount})">
        <label>Ответы</label>
        <div id='answers_div_${questionCount}'>
            <div><input type="text" id="answer1_${questionCount}" name="ans_1_${questionCount}" class="answer"><input value="1" type="radio" class="radio_ans" checked name="correctAnswer_${questionCount}"></div>
            <div><input type="text" id="answer2_${questionCount}" name="ans_2_${questionCount}" class="answer"><input value="2" type="radio" class="radio_ans" name="correctAnswer_${questionCount}"></div>
        </div>
        <button type="button" onclick="addAnswer(${questionCount})">Добавить ещё ответ</button>
    `;

    questionContent.style.display = 'block';
    questionBlock.appendChild(questionContent);

    questionTitle.addEventListener('click', function () {
        questionContent.style.display = questionContent.style.display === 'block' ? 'none' : 'block';
    });

    questionsSection.appendChild(questionBlock);
}

function oninp(questionNum){
    let quett = document.getElementById("question_title_"+questionNum);
    let quefr = document.getElementById("question"+questionNum);
    quett.innerHTML = quefr.value;
}

function addAnswer(questionNum) {
    let questionContent = document.getElementById("answers_div_"+questionNum);
    ansvers_counts[String(questionNum)] ++;

    let inpdiv = document.createElement('div');

    let newAnswerInput = document.createElement('input');
    newAnswerInput.type = 'text';
    newAnswerInput.name = "ans_" + ansvers_counts[String(questionNum)] + "_" + questionNum;
    newAnswerInput.classList.add('answer');
    newAnswerInput.id = "answer"+ ansvers_counts[String(questionNum)] + "_" + questionNum;

    let newRadioInput = document.createElement('input');
    newRadioInput.type = 'radio';
    newRadioInput.name = `correctAnswer_${questionNum}`;
    newRadioInput.value = ansvers_counts[String(questionNum)]
    newRadioInput.classList.add('radio_ans');

    inpdiv.appendChild(newAnswerInput);
    inpdiv.appendChild(newRadioInput);
    questionContent.appendChild(inpdiv);
}

function showResults() {
    if (currentStep === 2) {
        document.getElementById('questionPart').style.display = 'none';
        document.getElementById('resultsPart').style.display = 'block';
        currentStep++;
    }
}

function addResultRow(x, y) {
    let resultsTable = document.getElementById('resultsTable');
    rowsCount ++;
    let newRow = resultsTable.insertRow();

    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);
    let cell3 = newRow.insertCell(2);

    cell1.innerHTML = '<input class="tbli" type="number" min="0" max="100" name="row_' + rowsCount + '_min">';
    cell2.innerHTML = '<input class="tbli" type="number" min="0" max="100" name="row_' + rowsCount + '_max">';
    cell3.innerHTML = '<input class="tbli" type="text" name="row_' + rowsCount + '_text">';

    if (x != 'x'){
        cell1.getElementsByTagName('input')[0].value = x
        cell2.getElementsByTagName('input')[0].value = y 
    }
}

let testInfo = {}
function finishTest() {
    let testName = document.getElementById('testName').value;
    let testDescription = document.getElementById('testDescription').value;

    let questions = [];
    let questionDivs = document.querySelectorAll('.question');
    questionDivs.forEach(questionDiv => {
        let question = {
            questionText: questionDiv.value,
            answers: []
        };

        let answerInputs = questionDiv.parentElement.querySelectorAll('.answer');
        let radioInputs = questionDiv.parentElement.querySelectorAll('input[type="radio"]');

        answerInputs.forEach((answerInput, index) => {
            let answer = {
                answerText: answerInput.value,
                isCorrect: radioInputs[index].checked
            };
            question.answers.push(answer);
        });

        questions.push(question);
    });

    let results = [];
    let resultsTable = document.getElementById('resultsTable');
    let resultRows = resultsTable.querySelectorAll('tr');
    resultRows.forEach(row => {
        let cells = row.querySelectorAll('input');
        let percentage = cells[0].value;
        let resultText = cells[1].value;

        results.push({
            percentage: percentage,
            resultText: resultText
        });
    });

    testInfo = {
        testName: testName,
        testDescription: testDescription,
        questions: questions,
        results: results
    };

    console.log(testInfo);
}