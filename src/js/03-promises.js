import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

function createPromise(position, delay) {
  const promiseData = { position: position, delay: delay };
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(promiseData);
      } else {
        reject(promiseData);
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

    form.elements.delay.value = '';
    form.elements.step.value = '';
    form.elements.amount.value = '';

    for (let i = 0; i < amount; i++) {
      const currentDelay = delay + i * step;
      createPromise(i + 1, currentDelay)
        .then(data => {
          iziToast.success({ title: 'Success', message: `Promise ${data.position} resolved after ${data.delay} ms` });
        })
        .catch(data => {
          iziToast.error({ title: 'Error', message: `Promise ${data.position} rejected after ${data.delay} ms` });
        });
    }
  });
});
