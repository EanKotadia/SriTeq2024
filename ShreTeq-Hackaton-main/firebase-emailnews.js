// Innit Firebase here
// Reference to your newsletter database
var SubscribeFormDB = firebase.database().ref("Newsletter");

// Function to fetch emails from Firebase
function fetchEmailsAndSendLetters() {
    SubscribeFormDB.once('value', (snapshot) => {
        const emailsData = snapshot.val();

        if (emailsData) {
            const emailsList = Object.values(emailsData).map(entry => entry.email);

            // Loop through each email and send a letter
            emailsList.forEach(email => {
                sendEmailUsingFormSubmit(email, "Newsletter Update", "This is the content of your newsletter.");
            });

            // Optionally display the emails on the page
            const emailDisplay = document.getElementById('email-list');
            emailDisplay.innerHTML = '';
            emailsList.forEach(email => {
                const emailElement = document.createElement('p');
                emailElement.textContent = email;
                emailDisplay.appendChild(emailElement);
            });

        } else {
            console.log("No emails found.");
        }
    });
}

// Function to send email using FormSubmit
function sendEmailUsingFormSubmit(toEmail, subject, messageContent) {
    // Create a form element dynamically
    const form = document.createElement('form');
    form.action = "https://formsubmit.co/";
    form.method = "POST";
    form.style.display = "none"; // Hide the form

    // Create input elements for email fields (to, subject, and message)
    const emailInput = document.createElement('input');
    emailInput.type = "hidden";
    emailInput.name = "email";
    emailInput.value = toEmail;

    const subjectInput = document.createElement('input');
    subjectInput.type = "hidden";
    subjectInput.name = "_subject";
    subjectInput.value = subject;

    const messageInput = document.createElement('input');
    messageInput.type = "hidden";
    messageInput.name = "message";
    messageInput.value = messageContent;

    // Add inputs to the form
    form.appendChild(emailInput);
    form.appendChild(subjectInput);
    form.appendChild(messageInput);

    // Append the form to the body and submit it
    document.body.appendChild(form);
    form.submit();

    // Remove the form after submission
    document.body.removeChild(form);
}