const wrapper = document.querySelector('.wrapper');

for (let i = 0; i < 100; i++){
  const el = document.createElement('div');
  el.innerHTML = i;
  wrapper.append(el);
}

function search(event){
  const inputValue = event.target.value;
  for (const el of [...wrapper.children]) {
    if (el.innerHTML.includes(inputValue)){
      el.classList.add('yellow')
      continue;
    }
  } 
}