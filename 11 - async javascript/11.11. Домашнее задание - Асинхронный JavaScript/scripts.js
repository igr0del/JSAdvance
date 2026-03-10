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

btn.addEventListener('click', function () {
  btn.disabled = true;
  resultEl.innerHTML = `<div class="placeholder">Загружаем данные...</div>`;
  setStatus('Делаю запрос к pokemon/ditto...', 'status--loading');

  const req1 = new XMLHttpRequest();
  req1.open('GET', pokemonUrl);

  req1.addEventListener('load', function () {
    if (req1.status !== 200) {
      btn.disabled = false;
      showError('HTTP error (pokemon): ' + req1.status);
      return;
    }

    let pokemonData;
    try {
      pokemonData = JSON.parse(req1.responseText);
    } catch (e) {
      btn.disabled = false;
      showError('Не смог распарсить ответ pokemon (JSON.parse error)');
      return;
    }

    const firstAbility = pokemonData.abilities && pokemonData.abilities[0] && pokemonData.abilities[0].ability;
    if (!firstAbility || !firstAbility.url) {
      btn.disabled = false;
      showError('Не нашёл abilities[0].ability.url в ответе pokemon');
      return;
    }

    const abilityName = firstAbility.name;
    const abilityUrl = firstAbility.url;

    setStatus('Теперь запрашиваю детали способности...', 'status--loading');

    const req2 = new XMLHttpRequest();
    req2.open('GET', abilityUrl);

    req2.addEventListener('load', function () {
      btn.disabled = false;

      if (req2.status !== 200) {
        showError('HTTP error (ability): ' + req2.status);
        return;
      }

      let abilityData;
      try {
        abilityData = JSON.parse(req2.responseText);
      } catch (e) {
        showError('Не смог распарсить ответ ability (JSON.parse error)');
        return;
      }

      const entries = abilityData.flavor_text_entries;
      if (!Array.isArray(entries)) {
        showError('В ответе ability нет flavor_text_entries');
        return;
      }

      let englishText = null;

      for (let i = 0; i < entries.length; i++) {
        if (entries[i].language && entries[i].language.name === 'en') {
          englishText = entries[i].flavor_text;
          break;
        }
      }

      if (!englishText) {
        showError('Не нашёл описание на английском (en)');
        return;
      }

      englishText = englishText.replaceAll('\n', ' ').replaceAll('\f', ' ').trim();

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
    });

    req2.addEventListener('error', function () {
      btn.disabled = false;
      showError('Network error (ability request)');
    });

    req2.send();
  });

  req1.addEventListener('error', function () {
    btn.disabled = false;
    showError('Network error (pokemon request)');
  });

  req1.send();
});