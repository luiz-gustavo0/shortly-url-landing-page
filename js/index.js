const form = document.querySelector('#form');
const button = document.querySelector('.btn-sqaure');
const span = document.querySelector('.form-box__span--error');
const containerLinks = document.querySelector('.container-links');

const handleSubmit = (event) => {
  const inputValue = event.target[0].value;
  form.reset();
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
      containerLinks.innerHTML += `
      <div class="box-link">
        <div class="box-link__item">
          <a href=${inputValue} target="_blank"> ${inputValue}</a>
        </div>
        <div class="box-link__group">
          <a href=${json.result.full_short_link} target="_blank" id='short-link'>
            ${json.result.full_short_link}
          </a>
        <button id="copy">Copy</button>
        </div>
      </div>
      `;
    })
    .catch((err) => {
      button.disabled = false;
      span.style.display = 'inline-block';
      console.log(err);
      return err;
    });
};

form.addEventListener('submit', handleSubmit);
