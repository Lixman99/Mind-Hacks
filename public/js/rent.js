// Get the input field element
const inputField = document.querySelector('#demo-one-input');
const priceField = document.querySelector('#price');
const totalField = document.querySelector('#totalPrice');
// Add an event listener for the focus event
inputField.addEventListener('focus', function() {
  // Do something when the input field receives focus
if ((inputField.value !== '')) {
    const reservationDate = inputField.value;
    const reservationArray = reservationDate.split("-");
    const pickup = reservationArray[0];
    const dropoff = reservationArray[1];
    const date1 = new Date(pickup);
    const date2 = new Date(dropoff);
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const numberDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    const priceArray = priceField.innerHTML.split('$');
    const dayPrice = priceArray[1];
    const totalPrice = numberDays * dayPrice;
    if (numberDays == 0 ) {
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
