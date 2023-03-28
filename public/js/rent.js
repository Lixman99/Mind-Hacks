// Handles the logic for the rent page
const inputField = document.querySelector('#datepicker');
const priceField = document.querySelector('#price');
const totalField = document.querySelector('#totalPrice');
const setDatesBtn = document.querySelector('#setDates')
const bookBtn = document.querySelector('#book');
const loggedCustomer = document.querySelector('#loggedCustomer')
let reservationData;
let email = loggedCustomer.innerHTML;
const currentUrl = window.location.href; // get the current URL
const parts = currentUrl.split("/");
const carId = parts[parts.length - 1]; // extract the carID out of the URL
//fetches all the reservations that are already in the system for the selected car
fetch(`http://localhost:3001/reservation/${carId}`, {
    method: 'get',
    headers: {
        'Content-Type': 'application/json'
    },
})
    .then(res => res.json())
    .then(data => getDateInfo(data))
    .catch(error => console.error(error))

function getDateInfo(data) {
    const dates = [];
    const allDates = [];
    //puts all start and end times into an array
    data.forEach((element) => {
        let startDate = element.pickup;
        let endDate = element.return;
        allDates.push({ "startDate": startDate, "endDate": endDate });
    })
    //put all dates between each start and end dates into an array for use on the calendar
    for (let i = 0; i < allDates.length; i++) {
        const startDate2 = new Date(allDates[i].startDate);
        const endDate2 = new Date(allDates[i].endDate);
        let currentDate = new Date(startDate2);
        while (currentDate < endDate2) {
            dates.push(currentDate.toISOString().slice(0, 10));
            currentDate.setDate(currentDate.getDate() + 1);
        }
    }
    //calendar script
    const DateTime = easepick.DateTime;
    const bookedDates = dates.map(d => {
        if (d instanceof Array) {
            const start = new DateTime(d[0], 'YYYY-MM-DD');
            const end = new DateTime(d[1], 'YYYY-MM-DD');
            return [start, end];
        }
        return new DateTime(d, 'YYYY-MM-DD');
    });
    const picker = new easepick.create({
        element: document.getElementById('datepicker'),
        css: [
            'https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css',
            'https://easepick.com/css/demo_hotelcal.css',
        ],
        plugins: ['RangePlugin', 'LockPlugin'],
        RangePlugin: {
            tooltipNumber(num) {
                return num - 1;
            },
            locale: {
                one: 'day',
                other: 'days',
            },
        },
        LockPlugin: {
            minDate: new Date(),
            minDays: 2,
            inseparable: true,
            filter(date, picked) {
                if (picked.length === 1) {
                    const incl = date.isBefore(picked[0]) ? '[)' : '(]';
                    return !picked[0].isSame(date, 'day') && date.inArray(bookedDates, incl);
                }

                return date.inArray(bookedDates, '[)');
            },
        }
    });
}

// Add an event listener for the focus event
setDatesBtn.addEventListener('click', function () {
    if ((inputField.value !== '')) { //if the input field has data
        const reservationDate = inputField.value;
        const reservationArray = reservationDate.split("-");
        const pickupDate = reservationArray[0] + "/" + reservationArray[1] + "/" + reservationArray[2]; //extract the pickup date from the input field
        const returnDate = reservationArray[3] + "/" + reservationArray[4] + "/" + reservationArray[5]; //extract the return date from the input field
        //change the date format to use the math function
        const date1 = new Date(pickupDate);
        const date2 = new Date(returnDate);
        //math to figure out the total number of days
        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        const numberDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        const priceArray = priceField.innerHTML.split('$');
        const dayPrice = priceArray[1];
        const totalPrice = numberDays * dayPrice; //calculate the total price
        reservationData = {
            "email": email,
            "carId": carId,
            "pickup": pickupDate,
            "return": returnDate,
            "price": totalPrice
        }
        //formatting the totalfield depending on the number of days
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
    if (totalField.innerHTML == "<br>") {
        alert("Please Set Dates First!");
    }
    else {
        //sends the reservation data
        fetch('http://localhost:3001/reservation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reservationData)
        })
            .then(showModal())
            .catch(error => console.error(error))
    }
}
);
//gives a reservation confirmation in a modal
function showModal() {
    // Get the modal element by ID
    const modal = document.getElementById('myModal');

    // Create a Bootstrap modal instance from the modal element
    const modalInstance = new bootstrap.Modal(modal);

    // Show the modal
    modalInstance.show();
}