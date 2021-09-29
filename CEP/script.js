const cepInput = document.querySelector('#cep');
const cidadeInput = document.querySelector('#cidade');
const ruaInput = document.querySelector('#rua');
const modal = document.querySelector('.modal');
const erro = document.querySelector('.modal p');
const botaoModal = document.querySelector('.modal button')

cepInput.addEventListener('change', function () {
  if (!Number(cepInput.value) || cepInput.value.length !== 8) {
    erro.textContent = "O CEP informado precisa ser um número com 8 caracteres.";
    modal.classList.remove('hidden');
    console.log("ERRO: o CEP informado precisa ser um número com 8 caracteres.");
    return;
  }

  const promiseResposta = fetch(`https://viacep.com.br/ws/${cepInput.value}/json/`);

  promiseResposta.then(function (resposta) {
    const promiseBody = resposta.json();
  
    promiseBody.then(function (body) {
      if (body.erro) {
        erro.textContent = "Parece que o CEP digitado não foi encontrado no nosso banco de dados, poderia verificar se foi digitado corretamente?";
        modal.classList.remove('hidden');
        console.log("ERRO: parece que o CEP digitado não foi encontrado no nosso banco de dados, poderia verificar se foi digitado corretamente?");
        return;
      }
      cidadeInput.value = body.localidade;
      ruaInput.value = body.logradouro;
    })
  });
});

botaoModal.addEventListener('click', function ()  {
  modal.classList.add('hidden');
});