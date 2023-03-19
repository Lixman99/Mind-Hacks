// Get the input field element
const inputField = document.querySelector('#demo-one-input');
const priceField = document.querySelector('#price');
const totalField = document.querySelector('#totalPrice');
const bookBtn = document.querySelector('#book');
const loggedCustomer = document.querySelector('#loggedCustomer')
let reservationData;
let email = loggedCustomer.innerHTML
// if (email) {
//     async function fetchData(email) {
//         try {
//             const response = await fetch('/api/customerbyemail', {
//                 method: 'POST',
//                 body: JSON.stringify({ "email": email }),
//                 headers: { 'Content-Type': 'application/json' },
//             });
// console.log(response);
//             if (response.ok) {
//             } else {
//                 alert('Error');
//             }
//         } catch (err) {
//             console.error(err);
//         }
//     }


//     // Call the async function to fetch the data
//     fetchData(email);
// }

// Add an event listener for the focus event
inputField.addEventListener('focus', function () {
    // Do something when the input field receives focus
    if ((inputField.value !== '')) {
        const currentUrl = window.location.href;
        const parts = currentUrl.split("/");
        const carId = parts[parts.length - 1];
        const reservationDate = inputField.value;
        const reservationArray = reservationDate.split("-");
        const pickupDate = reservationArray[0];
        const returnDate = reservationArray[1];
        const date1 = new Date(pickupDate);
        const date2 = new Date(returnDate);
        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        const numberDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        const priceArray = priceField.innerHTML.split('$');
        const dayPrice = priceArray[1];
        const totalPrice = numberDays * dayPrice;
        reservationData = {
            "email": email,
            "carId": carId,
            "pickup": pickupDate,
            "return": returnDate,
            "price": totalPrice
        }

        if (numberDays == 0) {
            const minDays = 1;
            totalField.innerHTML = `Your rental is for ${minDays} day, your total price is $${dayPrice}`
        }
        else if (numberDays == 1) {
            totalField.innerHTML = `Your rental is for ${numberDays} day, your total price is $${totalPrice}`
        }
        else {
            totalField.innerHTML = `Your rental is for ${numberDays} days, your total price is $${totalPrice}`
        }

    }
});
// Add an event listener for the onclick event
bookBtn.addEventListener('click', function () {

    console.log(reservationData);


    fetch('http://localhost:3001/reservation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservationData)
    })
        .then(showModal())
        .catch(error => console.error(error))

});
function showModal() {
    // Get the modal element by ID
    const modal = document.getElementById('myModal');

    // Create a Bootstrap modal instance from the modal element
    const modalInstance = new bootstrap.Modal(modal);

    // Show the modal
    modalInstance.show();
}


/* {{!-- <div class="modal fade" id="staticBackdrop" {{!-- data-bs-backdrop="static" --}} data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div id = "modalcontent2" class="modal-content">
           <h1>Reservation Confirmation</h1>
        <p>Thank you for reserving a car with us. Your reservation details are as follows:</p>
        <ul>
          <li>Car: ${carTitle}</li>
          <li>Pickup Date: ${this.pickup}</li>
          <li>Return Date: ${this.return}</li>
          <li>Total Price: $${this.price}</li>
        </ul>
        <p> Pick up time is 2 PM and return time is 11 AM </p>
        <p> Confirmation e-mail has been sent </p>
        <p>Thank you for choosing our car rental service!</p>
        <p>Click outside the box to close</p>

        </div>
    </div>
</div> --}} */