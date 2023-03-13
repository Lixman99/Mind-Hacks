const loginFormHandler = async (event) =>{
    event.preventDefault();

    const email = document.querySelector(`#email-login`).value.trim();
    const password =document.querySelector(`#password-login`).value.trim();
    if (email && password) {
        const response = await fetch(`/api/customer/login`,{
            method: `POST`,
            body:JSON.stringify({email,password}),
            headers: { "Content-Type":"application/json" }
        });

        if (response.ok){
            document.location.replace(`/`)
        } else {
            alert(`Login failed, try agin`)
        }
    }
};

document
    .querySelector(`.login-form`)
    .addEventListener(`submit`, loginFormHandler);