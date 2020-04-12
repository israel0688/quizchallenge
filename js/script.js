// RESOURCE: https://www.sitepoint.com/simple-javascript-quiz/

(function()
{
    
    function buildQuiz()
    {
      // Storing HTML output
      const output = [];
  
      
      myQuestions.forEach(
        (currentQuestion, questionNumber) => 
        {
  
          // soring answers
          const answers = [];
  
       
          for(letter in currentQuestion.answers)
          {
  
            
            answers.push(
              `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
            );
          }
  
        
          output.push(
            `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
          );
        }
      );
  
      
      quizContainer.innerHTML = output.join('');
    }
  
    function showResults()
    {
  
      // gather answer containers from our quiz
      const answerContainers = quizContainer.querySelectorAll('.answers');
  
      // keep track of user's answers
      let numCorrect = 0;
  
    
      myQuestions.forEach( (currentQuestion, questionNumber) =>
      {
  
       
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is correct
        if(userAnswer === currentQuestion.correctAnswer)
        {
          // add to the number of correct answers
          numCorrect++;
  
          // color answer green
          answerContainers[questionNumber].style.color = 'lightgreen';
        }
        
        else
        {
          // color answers red
          answerContainers[questionNumber].style.color = 'red';
        }
      });
  
      // show number of correct answers out of total
      resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    }
  
    function showSlide(n) 
    {
      slides[currentSlide].classList.remove('active-slide');
      slides[n].classList.add('active-slide');
      currentSlide = n;
      if(currentSlide === 0){
        backButton.style.display = 'none';
    }
      else
      {
        backButton.style.display = 'inline-block';
      }
      if(currentSlide === slides.length-1)
      {
        progressButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
      }
      else
      {
        progressButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
      }
    }
  
    function showNextSlide() 
    {
      showSlide(currentSlide + 1);
    }
  
    function showPreviousSlide() 
    {
      showSlide(currentSlide - 1);
    }
  
    
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const myQuestions = [
      {
        question: "Which software company developed JavaScript?",
        answers: {
          a: "Microsoft",
          b: "Firefox",
          c: "Netscape"
        },
        correctAnswer: "c"
      },
      {
        question: "Which symbol is used for comments in JavaScript?",
        answers: {
          a: "<>",
          b: "<!---->",
          c: "//"
        },
        correctAnswer: "c"
      },

      {
        question: "When did JavaScript start?",
        answers: {
          a: "2011",
          b: "1995",
          c: "2002"
        },
        correctAnswer: "b"
      },

      {
        question: "What was JavaScript originally called?",
        answers: {
          a: "Mocha",
          b: "LiveScript",
          c: "JavaScript"
        },
        correctAnswer: "a"
      },

      {
        question: "What does 'DOM' stand for?",
        answers: {
          a: "Document Oblique Model",
          b: "Document Object Matrix",
          c: "Domonique",
          d: "Document Object Model"
        },
        correctAnswer: "d"
      }
    ];
  
    
    buildQuiz();
  
    
    const backButton = document.getElementById("back");
    const progressButton = document.getElementById("forward");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    
    showSlide(currentSlide);
  
    // Event listeners
    submitButton.addEventListener('click', showResults);
    backButton.addEventListener("click", showPreviousSlide);
    progressButton.addEventListener("click", showNextSlide);
  })();