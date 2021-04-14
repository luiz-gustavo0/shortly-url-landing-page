const form = document.querySelector('#form');
const button = document.querySelector('.btn-sqaure');
const span = document.querySelector('.form-box__span--error');
const containerLinks = document.querySelector('.container-links');

console.log(containerLinks);

console.log(button);
console.log(span);

const handleSubmit = (event) => {
  let inputValue = event.target[0].value;
  button.disabled = true;

  event.preventDefault();

  fetch(`https://api.shrtco.de/v2/shorten?url=${inputValue}`)
    .then((res) => {
      if (res.ok) {
        button.disabled = false;
      }
      return res.json();
    })
    .then((json) => {
      containerLinks.innerHTML = `
      <div class="box-link">
        <div class="box-link__item">
          <a href=${inputValue}> ${inputValue}</a>
        </div>
        <div class="box-link__group">
          <a href=${json.result.full_short_link} data-js="short-link">${json.result.full_short_link}</a>
        <button>Copy</button>
        </div>
      </div>
      `;
    })
    .catch((err) => {
      span.style.display = 'inline-block';
      console.log(err.messgae);
    });
};

form.addEventListener('submit', handleSubmit);
