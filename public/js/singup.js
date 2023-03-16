const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector(`#name-signup`).value.trim();
  const email = document.querySelector(`#email-signup`).value.trim();
  const password = document.querySelector(`#password-signup`).value.trim();
  const phone = document.querySelector(`#phone-signup`).value.trim();

  if (email) {
    const response = await fetch(`/api/customer/signup`, {
      method: `POST`,
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });

    if (email.ok) {
      alert(`Use a diferent email`);
    }
  }

  if (email && password) {
    const response = await fetch(`/api/customer/login`, {
      method: `POST`,
      body: JSON.stringify({ email, password, phone, name }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace(`/`);
    } else {
      alert(`Sign up failed, try agin`);
    }
  }
};

document
  .querySelector(`.signup-form`)
  .addEventListener(`submit`, loginFormHandler);
