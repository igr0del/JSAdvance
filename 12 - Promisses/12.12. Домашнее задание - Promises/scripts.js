const btn = document.getElementById('btn');
const statusEl = document.getElementById('status');
const resultEl = document.getElementById('result');

const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/ditto';

function setStatus(text, type) {
  statusEl.textContent = text;
  statusEl.className = 'status ' + type;
}

function showError(message) {
  resultEl.innerHTML = `
    <div class="grid">
      <div class="block">
        <div class="label">Ошибка</div>
        <div class="value">${message}</div>
      </div>
    </div>
  `;
  setStatus('Ошибка', 'status--error');
}

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

// Функция, возвращающая промис с результатом XHR-запроса
function request(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        resolve(xhr.responseText);
      } else {
        reject(new Error(`HTTP error ${xhr.status}`));
      }
    });
    xhr.addEventListener('error', () => {
      reject(new Error('Network error'));
    });
    xhr.send();
  });
}

btn.addEventListener('click', function () {
  btn.disabled = true;
  resultEl.innerHTML = `<div class="placeholder">Загружаем данные...</div>`;
  setStatus('Делаю запрос к pokemon/ditto...', 'status--loading');

  let abilityName; // сохраним имя способности для вывода

  request(pokemonUrl)
    .then(responseText => {
      let pokemonData;
      try {
        pokemonData = JSON.parse(responseText);
      } catch {
        throw new Error('Не смог распарсить ответ pokemon (JSON.parse error)');
      }

      const firstAbility = pokemonData.abilities?.[0]?.ability;
      if (!firstAbility?.url) {
        throw new Error('Не нашёл abilities[0].ability.url в ответе pokemon');
      }

      abilityName = firstAbility.name;
      setStatus('Теперь запрашиваю детали способности...', 'status--loading');
      return request(firstAbility.url);
    })
    .then(abilityResponseText => {
      let abilityData;
      try {
        abilityData = JSON.parse(abilityResponseText);
      } catch {
        throw new Error('Не смог распарсить ответ ability (JSON.parse error)');
      }

      const entries = abilityData.flavor_text_entries;
      if (!Array.isArray(entries)) {
        throw new Error('В ответе ability нет flavor_text_entries');
      }

      const englishEntry = entries.find(entry => entry.language?.name === 'en');
      if (!englishEntry) {
        throw new Error('Не нашёл описание на английском (en)');
      }

      let englishText = englishEntry.flavor_text
        .replaceAll('\n', ' ')
        .replaceAll('\f', ' ')
        .trim();

      // Отображаем результат
      resultEl.innerHTML = `
        <div class="grid">
          <div class="block">
            <div class="label">Покемон</div>
            <div class="value value--big">Ditto</div>
          </div>
          <div class="block">
            <div class="label">Первая способность</div>
            <div class="value value--big">${escapeHtml(abilityName)}</div>
          </div>
          <div class="block">
            <div class="label">Описание (EN)</div>
            <div class="value">${escapeHtml(englishText)}</div>
          </div>
        </div>
      `;
      setStatus('Готово ✅', 'status--success');
    })
    .catch(error => {
      showError(error.message);
    })
    .finally(() => {
      btn.disabled = false;
    });
});