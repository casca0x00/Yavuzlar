const questions = [
    {
        question: "Hangisi Dostoyevski'nin kitabıdır?",
        answers: [
            
                {text: "İvan İlyiç'in Ölümü", correct: false},
                {text: "Notre Dame'ın Kamburu", correct: false},
                {text: "Prens", correct: false},
                {text: "Beyaz Geceler", correct: true},
            ]
    },
    {
        question: "En iyi Megadeth şarkısı :)))",
        answers: [
            
                {text: "Washington is next", correct: false},
                {text: "Hangar 18", correct: false},
                {text: "Wake Up Dead", correct: false},   
                {text: "Symphony of Destruction", correct: true},
            ]
    },
    {
        question: "İskandinav mitolojisinde Ölüm Tanrıçası kimdir?",
        answers: [
            
                {text: "Hel", correct: true},
                {text: "Bragi", correct: false},
                {text: "Njord", correct: false},   
                {text: "Baldur", correct: false},
            ]
    },



];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("cevapbutonu");
const nextButton = document.getElementById("sbtn");

let currentQuestionIndex = 0;
let score = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startQuiz(){
    shuffle(questions);
    currentQuestionIndex =0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

    function showQuestion(){
        resetState();
        let currentQuestion = questions[currentQuestionIndex];
        let questionNo = currentQuestionIndex +1;
        questionElement.innerHTML = questionNo + ". " +
         currentQuestion.question;

         currentQuestion.answers.forEach(answer => {
            const button = document.createElement("button");
            button.innerHTML = answer.text;
            button.classList.add("cbtn");
            answerButtons.appendChild(button);
            if(answer.correct){
                button.dataset.correct = answer.correct;
            }
            button.addEventListener("click", selectAnswer);
         });
    }

    function resetState(){
        nextButton.style.display = "none";
        while(answerButtons.firstChild){
            answerButtons.removeChild(answerButtons.firstChild);
        }
    }



    function selectAnswer(e){
        const selectedBtn = e.target;
        const isCorrect = selectedBtn.dataset.correct === "true";
        if(isCorrect){
            selectedBtn.classList.add("correct");
            score++;
        }else{
            selectedBtn.classList.add("incorrect");
        }
        Array.from(answerButtons.children).forEach(button => {
            if(button.dataset.correct ==="true"){
                button.classList.add("correct");
            }
            button.disabled = true;
        });

        nextButton.style.display = "block";
    }

        function showScore(){
            resetState();
            questionElement.innerHTML = `${questions.length} sorudan ${score} tanesini doğru yaptınııızz :)`;
            nextButton.innerHTML = "tekrar çözün";
            nextButton.style.display = "block"
        }

        function handleNextButton(){
            currentQuestionIndex ++;
            if(currentQuestionIndex < questions.length){
                showQuestion();
            }else{
                showScore();
            }
        }

    nextButton.addEventListener("click",()=>{
        if(currentQuestionIndex < questions.length){
            handleNextButton();
        }else{
            startQuiz();
        }
    })

    startQuiz();
