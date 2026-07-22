function race(promises) {
  return new Promise((resolve, reject) => {
    for (const promise of promises) {
      Promise.resolve(promise).then(resolve, reject);
    }
  });
}

function createPromise(delay, value, shouldReject = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldReject) {
        reject(value);
        return;
      }

      resolve(value);
    }, delay);
  });
}

const runButton = document.querySelector('#runButton');
const resultText = document.querySelector('#resultText');
const resultBlock = document.querySelector('.result');

runButton.addEventListener('click', async () => {
  runButton.disabled = true;
  resultText.textContent = 'Ожидание первого завершившегося промиса...';
  resultBlock.classList.remove('success', 'error');

  const promises = [
    createPromise(3000, 'Первый промис выполнен'),
    createPromise(1000, 'Второй промис отклонён', true),
    createPromise(2000, 'Третий промис выполнен')
  ];

  try {
    const value = await race(promises);

    resultText.textContent = `Успешный результат: ${value}`;
    resultBlock.classList.add('success');

    console.log(value);
  } catch (error) {
    resultText.textContent = `Ошибка: ${error}`;
    resultBlock.classList.add('error');

    console.error(error);
  } finally {
    runButton.disabled = false;
  }
});
