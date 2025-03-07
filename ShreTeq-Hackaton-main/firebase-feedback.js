// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference your database
var FeedbackFormDB = firebase.database().ref("FeedbackForm");

// Add an event listener to the form submission
document.getElementById("feedback-form").addEventListener("submit", submitForm);

// Function to handle form submission
function submitForm(e) {
  e.preventDefault();

  var name = getElementVal("name");
  var email = getElementVal("email");
  var feedback = getElementVal("feedback");

  saveFeedback(name, email, feedback); // Call function to save feedback

  // Show alert for successful submission (optional)
  alert("Feedback submitted successfully!");

  // Reset the form
  document.getElementById("feedback-form").reset();
}

// Function to get form values by ID
const getElementVal = (id) => {
  return document.getElementById(id).value;
};

// Save feedback to Firebase
function saveFeedback(name, email, feedback) {
  var newFeedbackForm = FeedbackFormDB.push();
  newFeedbackForm.set({
    name: name,
    email: email,
    feedback: feedback,
  });
}
