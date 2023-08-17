/*eslint-disable*/
import axios from 'axios';
import { showAlert } from './alert';

const stripe = Stripe(
  'pk_test_51NfHwOL7dMFN7sck4HIMRxIIqnkrGwMwnxGVn9w7nO8fpZZbti8ccISAmyC6B6yk11yabsy6mCD4LbuoUj9u2ZuX00p5R8TbzB'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);
    // 2) Create checkout fomr + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err.message);
  }
};
