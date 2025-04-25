// Script to send contact form data to Google Sheets
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const scriptURL = 'https://script.google.com/macros/s/AKfycbySmoRokUWKc9DVIfKiWCkcaFg6bEMQ4a5pkGhYc0rOZ5o0Ju71ZTjbYhxirKWQynEKNQ/exec';
    
    console.log("Contact form script initialized");
    
    if (form) {
        console.log("Contact form found in DOM");
        
        form.addEventListener('submit', e => {
            e.preventDefault();
            console.log("Form submission started");
            
            // Change button text/state
            const submitBtn = form.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Log form data for debugging
            const formData = new FormData(form);
            console.log("Form data collected:");
            for (let pair of formData.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }
            
            // Convert FormData to URL-encoded string for compatibility
            const urlEncodedData = new URLSearchParams(formData).toString();
            console.log("URL encoded data: " + urlEncodedData);
            
            // Send data to Google Sheet
            console.log("Sending data to: " + scriptURL);
            
            fetch(scriptURL, {
                method: 'POST',
                mode: 'no-cors', // This prevents CORS errors
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: urlEncodedData
            })
            .then(response => {
                console.log("Response received");
                console.log("Response type: " + response.type);
                console.log("Form submitted successfully");
                
                // Show success message
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.backgroundColor = '#00eeff';
                
                // Reset form after delay
                setTimeout(() => {
                    form.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.disabled = false;
                    console.log("Form reset completed");
                }, 3000);
            })
            .catch(error => {
                console.error('Error in form submission:', error.message);
                submitBtn.textContent = 'Error! Try Again';
                submitBtn.style.backgroundColor = '#ff3860';
                
                // Reset button after delay
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.disabled = false;
                }, 3000);
            });
        });
    } else {
        console.error("Contact form element not found in DOM. Check if the form has id='contact-form'");
    }
}); 