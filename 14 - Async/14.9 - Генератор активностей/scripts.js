async function getActivity() {
  const response = await fetch('https://www.boredapi.com/api/activity');

  if (!response.ok) {
    throw new Error(`Ошибка запроса: ${response.status}`);
  }

  return response.json();
}

async function generate() {
  try {
    const data = await getActivity();

    console.log(data);
    console.log(`Занятие: ${data.activity}`);
  } catch (error) {
    console.error(error);
  }
}

generate();