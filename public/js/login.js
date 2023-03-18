//const signupBtn = document.querySelector('#signUp');
const signupForm = document.querySelector('#signupForm');
console.log(signupForm);
function submitForm(event) {
    event.preventDefault();
    const name = document.getElementById("name-signup").value;
    console.log(name);
    const email = document.getElementById("email").value;
}

const loginFormHandler = async (event) =>{
    event.preventDefault();

    const email = document.querySelector(`#email-login`).value.trim();
    const password =document.querySelector(`#password-login`).value.trim();
    if (email && password) {
        const response = await fetch(`/api/logmein`,{
            method: `POST`,
            body:JSON.stringify({email,password}),
            headers: { "Content-Type":"application/json" }
        });

        if (response.ok){
            //document.location.replace(`/`)
        } else {
            alert(`Login failed, try again`)
        }
    }
};

// document
//     .querySelector(`.login-form`)
//     .addEventListener(`submit`, loginFormHandler);