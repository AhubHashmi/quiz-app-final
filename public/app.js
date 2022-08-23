 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-analytics.js";
 import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
     apiKey: "AIzaSyB3oC95HPj_tQlBSp8M0vzAobyOPTb1PGQ",
     authDomain: "quiz-app-bf32f.firebaseapp.com",
     databaseURL: "https://quiz-app-bf32f-default-rtdb.firebaseio.com",
     projectId: "quiz-app-bf32f",
     storageBucket: "quiz-app-bf32f.appspot.com",
     messagingSenderId: "469857392278",
     appId: "1:469857392278:web:c3df8de0fd38207077d4b7",
     measurementId: "G-GNM1XJDTSR"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);
 const databs = getDatabase();

 var questions = [{
         question: "Independence Day of Pakistan",
         options: ["14th August", "15th August", "16th August"],
         correctAnswer: "14th August",
     },
     {
         question: "HTML stands for _______________________",
         options: ["HyperTextMakeupLanguage", "HyperTextMarkupLanguage", "HoTMaiL"],
         correctAnswer: "HyperTextMarkupLanguage",
     },
     {
         question: "CSS stands for ___________________",
         options: ["ComputerSourceStyle", "CodeStyleStructure", "CascadingStyleSheet"],
         correctAnswer: "CascadingStyleSheet",
     },
     {
         question: "JavaScript is a: ",
         options: ["Programming Language", "Data Base", "Computer Language"],
         correctAnswer: "Programming Language",
     },
 ];

 var question = document.getElementById("question");
 var currentQuestion = document.getElementById("currentQuestion");
 var totalQuestions = document.getElementById("totalQuestions");
 var answerParent = document.getElementById("answerParent");
 var indexNumber = 0;
 var score = 0;

 window.startQuiz = function() {
     question.innerHTML = questions[indexNumber].question;
     answerParent.innerHTML = "";
     for (var i = 0; i < questions[indexNumber].options.length; i++) {
         answerParent.innerHTML += `<div class="col-md-6 py-2"><button onclick="checkQuestion(this, '${questions[indexNumber].correctAnswer}')" class="btn w-100 btn-info">${questions[indexNumber].options[i]}</button></div>`;
     }
     totalQuestions.innerHTML = questions.length;
     currentQuestion.innerHTML = indexNumber + 1;
 }
 startQuiz();

 window.nextQuestion = function() {
     var obj = {
         //  answerParent,
         //  question,
         //  totalQuestions,
         indexNumber,
         score,
         //  currentQuestion,
         questions,
     };
     console.log(obj);
     //   answerParent.innerHTML = "";
     if (indexNumber == questions.length - 1) {
         alert("Quiz Completed");
         alert("Your Score is " + score + "/4");
         answerParent.innerHTML = `<button onclick="location.reload()">Reload</button>`

         //   obj.id = push(ref(databs, "farmhouses")).key;
         //   const postListRef = ref(databs, `farmhouses/${obj.id}`);
         //   set(postListRef, obj);
         var reference = ref(databs, "questions/");
         var newRef = push(reference);
         obj.id = newRef.key;
         set(newRef, obj);
     } else {
         indexNumber = indexNumber + 1;
         startQuiz();
     }
 };
 var questionsData;

 //   function renderQuestions() {
 //       var parent = document.getElementById("dispQuestions");
 //       parent.innerHTML = "";
 //       for (var i = 0; i < questionsData.length; i++) {
 //           parent.innerHTML += `<div class="bg-light p-2 my-2 rounded shadow">
 //     <p class="fs-5 fw-bold">${questionsData[i].text}</p>
 //     <p>Time: ${questionsData[i].dt}</p>
 //     </div>`;
 //       }
 //   }

 function getAllQuestion() {
     var reference = ref(databs, "questions/");
     onValue(reference, function(data) {
         questionsData = Object.values(data.val());
         console.log(questionsData);
         //   renderQuestions();
     });
 }
 getAllQuestion();

 window.checkQuestion = function(elem, correctOption) {
     var userOption = elem.innerHTML;
     if (userOption == correctOption) {
         score = score + 1;
     }
     console.log(score);
     var allOptionBtns = answerParent.getElementsByTagName("BUTTON");
     for (var i = 0; i < allOptionBtns.length; i++) {
         allOptionBtns[i].disabled = true;
         if (allOptionBtns[i].innerHTML === correctOption) {
             allOptionBtns[i].className += " bg-success"
         } else {
             allOptionBtns[i].className += " bg-danger"
         }
     }
 };