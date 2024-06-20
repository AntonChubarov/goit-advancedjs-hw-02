import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`Promise ${position} resolved after ${delay} ms`);
      } else {
        reject(`Promise ${position} rejected after ${delay} ms`);
      }
    }, delay);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');

  form.addEventListener('submit', event => {
    event.preventDefault();

    const delay = parseInt(form.elements.delay.value, 10);
    const step = parseInt(form.elements.step.value, 10);
    const amount = parseInt(form.elements.amount.value, 10);

    for (let i = 0; i < amount; i++) {
      const currentDelay = delay + i * step;
      createPromise(i + 1, currentDelay)
        .then(message => {
          iziToast.success({ title: 'Success', message: message });
        })
        .catch(message => {
          iziToast.error({ title: 'Error', message: message });
        });
    }
  });
});
