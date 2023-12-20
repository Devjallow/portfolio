
document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signupForm');

    signupForm.addEventListener('submit', function (event) {
        event.preventDefault();

             
        const signupName = document.getElementById('username').value;
        const signupEmail = document.getElementById('usermail').value;
        const signupPassword = document.getElementById('password').value;
        

        
        
        fetch('https://embadi43.pythonanywhere.com/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              
            },
            body: JSON.stringify({
                name: signupName,
                email: signupEmail,
                password: signupPassword,
                
            }),
        })
        .then(response => response.json())
        .then(data => {
            
           
            console.log('Signup successful:', data);
            alert("Successfully create a User")

           
            const timestamp = data.timestamp;
            const userId = data.id;

            window.location.href = '/portfolio/login.html';

           
        })
        .catch(error => {
            
            console.error('Signup failed:', error);

           
        });
    });
});

