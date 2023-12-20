document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginform');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

     
        const loginEmail = document.getElementById('loginemail').value;
        const loginPassword = document.getElementById('password').value;

        fetch('https://embadi43.pythonanywhere.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: loginEmail,
                password: loginPassword,
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
           
            console.log('Login successful:', data);

            window.location.href = '/portfolio/User.html'; 
        })
        .catch(error => {
          
            console.error('Login failed:', error);

          
        });
    });
});

