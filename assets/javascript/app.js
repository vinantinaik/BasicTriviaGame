
var timeLeft;
var questions = [
    {
        id: 1,
        question: "What is the capital of United States?",
        answers: {
            a: "New York",
            b: "Washington D.C.",
            c: "Miami",
        },
        correctAnswer: "b"
    },
    {
        id: 2,
        question: "What continent is Russia in?",
        answers: {
            a: "Europe",
            b: "Asia",
            c: "North America",
        },
        correctAnswer: "a"
    },
    {
        id: 3,
        question: "How many countries are in European union?",
        answers: {
            a: "Every country in Europe",
            b: "10",
            c: "28",
        },
        correctAnswer: "c"
    },
    {
        id: 4,
        question: "When using tags in HTML code, they always appear how??",
        answers: {
            a: "Inside of angled brackets ",
            b: "Inside of curly brackets ",
            c: "Inside of square brackets ",
        },
        correctAnswer: "a"
    }
];

var unAttempted = 0;
var correctCount = 0;
var wrongCount = 0;
var quizTime = 100;
var intervalID;





$(document).ready(function () {

    $("#start").on("click", function () {

        $(".lead").empty();
        run();
        buildQuiz();


    });


    function buildQuiz() {
        // we'll need a place to store the HTML output
        const output = [];

        // for each question...
        questions.forEach(
            (questObj, questionNumber) => {

                // store all the anser choices
                const answers = [];


                for (letter in questObj.answers) {

                    // ...add an HTML radio button
                    answers.push(
                        `<div class="form-check">
                        <input class="form-check-input" type="radio" name="question${questionNumber}" value="${letter}">
                        <label class="form-check-label">${letter} : ${questObj.answers[letter]}
                        </label> </div>`
                    );
        
                }

                // add this question and its answers to the output
                output.push(
                    `<div class="form-group"> ${questObj.id}.  ${questObj.question} </div>
                     <div class="form-group"> ${answers.join('')} </div><hr>`
                );
            }
        );

        // finally combine our output list into one string of HTML and put it on the page
        $("#quizContainer").html(output.join(''));

    }


    function displayScore() {
        $("#correct").html("Correct answers : " + correctCount);
        $("#wrong").html("Wrong answers : " + wrongCount);
        $("#attempted").html("You attempted : " + unAttempted);

    }

    function getResults(){
        var contList = $("#quizContainer").find(".form-check-input");
		var selector;
		
		 questions.forEach(
            (questObj, questionNumber) => {
				
				//selector = contList[questionNumber];
				//selector = $('input[name=question'+questionNumber+']:checked');
				 selector = $('input[name=question'+questionNumber+']:checked').val();
				
				if (selector === undefined)
				{
					console.log($(selector).val());
				  unAttempted++;
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






    //helper methods
    function run() {
        clearInterval(intervalID);
        intervalID = setInterval(decrement, 1000);
    }

    function decrement() {
        //Decrement number by one;
        quizTime--;

        //display the time left
        $("#time-left").html("<h2>" + "Time remaining : " + quizTime + "</h2>");

        //if time remaining is zero display final score
        if (quizTime === 0) {
            clearInterval(intervalID);
            $("#quizContainer").empty();
            displayScore();

        }
    }



});
