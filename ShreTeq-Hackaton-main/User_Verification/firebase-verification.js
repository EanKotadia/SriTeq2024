// Your web app's Firebase configuration (Replace with your own config object)
import firebaseConfig from "./firebaseConfig";
    
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Ensure the DOM is fully loaded before adding event listeners
  document.addEventListener("DOMContentLoaded", function () {
    // Reference your database for the news articles
    var NewsVerificationDB = firebase.database().ref("NewsVerification");
  
    // Add an event listener to the form submission
    var newsForm = document.getElementById("NewsForm");
    if (newsForm) {
      newsForm.addEventListener("submit", submitForm);
    } else {
      console.log("NewsForm element not found.");
    }
  
    // Function to handle form submission
    function submitForm(e) {
      e.preventDefault();
  
      // Get form value (assuming just the article text)
      var article = getElementVal("article-input");
  
      // Save the news article
      saveArticle(article);
  
      // Show alert for successful submission
      alert("Article submitted successfully!");
  
      // Reset the form
      document.getElementById("NewsForm").reset();
    }
  
    // Function to get form values by ID
    const getElementVal = (id) => {
      return document.getElementById(id).value;
    };
  
    // Save article to Firebase
    function saveArticle(article) {
      var newArticleRef = NewsVerificationDB.push();
  
      // Save the article text
      newArticleRef.set({
        article: article
      }, function (error) {
        if (error) {
          console.log("Error saving data:", error);
        } else {
          console.log("Data saved successfully!");
        }
      });
    }
  });
  
