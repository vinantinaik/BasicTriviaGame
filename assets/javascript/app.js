
var questions = [
    {
        id: 1,
        question: "At Dartmouth College in 1964 John Kemeny and Thomas Kurtz invented .... ?",
        answers: {
            a: "ALGOL",
            b: "BASIC",
            c: "FORTRAN",
        },
        correctAnswer: "b"
    },
    {
        id: 2,
        question: "Complete this quote “Computers are useless. They can only give you -------” (Pablo Picasso)",
        answers: {
            a: "numbers",
            b: "headaches",
            c: "answers",
        },
        correctAnswer: "c"
    },
    {
        id: 3,
        question: "Who invented C++ ?",
        answers: {
            a: "Larry Wall",
            b: "Bjarne Stroustrup",
            c: "Alan Cooper",
        },
        correctAnswer: "b"
    },
    {
        id: 4,
        question: "Which of these is not a functional programming language?",
        answers: {
            a: "Fortran",
            b: "LISP",
            c: "F#",
        },
        correctAnswer: "a"
    },
    {
        id: 5,
        question: "A true or false statement put into code that the programmer expects to always be true is an ...",
        answers: {
            a: "exception",
            b: "expression",
            c: "assertion",
        },
        correctAnswer: "c"
    }
    ,
    {
        id: 6,
        question: "A section of code that responds to a particular interaction of the user with a gui control is called a ... ?",
        answers: {
            a: "event handler",
            b: "dispatch function",
            c: "control structure",
        },
        correctAnswer: "a"
    },
    {
        id: 7,
        question: "You could use XSLT to ...",
        answers: {
            a: "speed up database queries",
            b: "transform XML into HTML",
            c: "cache html pages",
        },
        correctAnswer: "b"
    },
    {
        id: 8,
        question: "I define 8 different methods, including CONNECT, PATCH, PUT and POST. I am stateless. I have a four letter name. What am I ?",
        answers: {
            a: "HTML",
            b: "XAML",
            c: "HTTP",
        },
        correctAnswer: "c"
    }

];
var timeLeft;
var unAnsweredCount ;
var correctCount;
var wrongCount;
var quizTime ;
var intervalID;


function initializeTrivia(){
    timeLeft=0;
    unAnsweredCount=0;
    correctCount=0;
    wrongCount=0;
    quizTime=120;
    $("#result").hide();
    $("#submit").hide();
    
}


$(document).ready(function () {

    //initialize all game variables
    initializeTrivia();

    //when player clicks on start run the timer and build the quiz
    $("#start").on("click", function () {
        $(".lead").empty();
        run();
        buildQuiz();
        $("#submit").show();
    });

    //If user clicks on submit display results
    $("#submit").click(function(){

        completeTrivia();

    });


    function buildQuiz() {
        // we'll need a place to store the HTML output
        var  trivia = [];

        // for each question...
        questions.forEach(
            (questObj, questionNumber) => {

                // store all the answer choices
                var answers = [];
                for (letter in questObj.answers) {
                    // ...add an HTML radio button
                    answers.push(
                        `<div class="form-check">
                        <input class="form-check-input" type="radio" name="question${questionNumber}" value="${letter}">
                        <label class="form-check-label">${letter} : ${questObj.answers[letter]}
                        </label> </div>`
                    );
        
                }

                // add this question and its answers to the quiz
                trivia.push(
                    `<div class="form-group"> ${questObj.id}.  ${questObj.question} </div>
                     <div class="form-group"> ${answers.join('')} </div><hr>`
                );
            }
        );

        // Add questions with possible answers 
        $("#quizContainer").html(trivia.join(''));

    }


    //display final score
    function displayScore() {
        $("#submit").hide();
        $("#result").show();
        $("#correct").html("Correct answers : " + correctCount);
        $("#wrong").html("Wrong answers : " + wrongCount);
        $("#unanswered").html("Unanswered : " + unAnsweredCount);

    }

    //check quiz and calculate the counter for correct, wrong and unanswered
    function getResults(){
        var selector;
		
		 questions.forEach(
            (questObj, questionNumber) => {
						
				 selector = $('input[name=question'+questionNumber+']:checked').val();
				
				if (selector === undefined)
				{
					console.log($(selector).val());
				  unAnsweredCount++;
				}
				else if(questObj.correctAnswer === selector)
				{
					correctCount++;
				}
				else{
					wrongCount++;
				}
				
			});
        
    }

    function completeTrivia()
    {
        clearInterval(intervalID);
        getResults();
        displayScore();
        $("#quizContainer").empty();

    }


    //helper methods
    function run() {
        clearInterval(intervalID);
        intervalID = setInterval(decrement, 1000);
    }

    function decrement() {
        //Decrement number by one;
        quizTime--;

        //display the time left
        //$("#time-left").html("<h2>" + "Time remaining : " + quizTime + "</h2>");
        $("#time-left").html("Time remaining : " + quizTime);

        //if time remaining is zero display final score
        if (quizTime === 0) {
            completeTrivia();
        }
    }



});