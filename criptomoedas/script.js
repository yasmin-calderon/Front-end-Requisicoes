const criptoInput = document.querySelector('#cripto');
const maxUnit = document.querySelector('.max-unit');
const qtd = document.querySelector('.qtd');
const maxPreco = document.querySelector('.max-preco');

criptoInput.addEventListener('change', function () {
  if (!criptoInput.value) {
    return;
  }

  const promiseResposta = fetch(`https://www.mercadobitcoin.net/api/${criptoInput.value}/ticker/`);

  promiseResposta.then(function (resposta) {
    const promiseBody = resposta.json();

    promiseBody.then(function (body) {
      maxUnit.textContent = Number(body.ticker.high).toFixed(2);
      qtd.textContent = body.ticker.vol;
      maxPreco.textContent = Number(body.ticker.buy).toFixed(2);
    });
  });
});