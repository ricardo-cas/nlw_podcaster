- [Anotações](#anotações)
  - [O Arquivo \_app.tsx](#o-arquivo-_apptsx)
  - [O Arquivo \_document.tsx](#o-arquivo-_documenttsx)
  - [A Pasta Components](#a-pasta-components)

# Anotações

Exemplo do uso do **typeScript**:

```typeScript
type User = {
name: string,
address: {
city: string;
state: string;
}
}
// retornar o texto de boas vindas do site
function createWelcomeMessage (user: User) {
return `Boas-vindas, &{user.name}! Cidade: ${user.address.city} - Estado: ${user.address.state}.`
}

const welcomeMessage = createWelcomeMessage({
name: 'Ricardo Costa',
address: {
city: 'São Paulo',
state: 'SP'
}
})

// vamos utilizar o Typescript dentro dos componentes do React, principalmente para fazer a parte de tipagem das propriedades de um componente.

type ButtonProps = {
title: string;
}

function Button (props: ButtonProps){
return(
<button>{props.title}</button>
)
}

// O typescript ajuda a não cometer erros na hora do desenvolvimento, pois o próprio editor irá nos ajudar a escrever o código de acordo com a tipagem que foi definida e também facilita na manutenção do código.

function app(){
return (
<>
<Button title = "Button 1" />
<Button title = "Button 2" />
<Button title = "Button 3" />
<Button title = "Button 4" />
<Button title = "Button 5" />
</>
)
}
```

Extensão **tsx: typescript + jsx(xml no javascript)**

Qualquer aplicação react podemos importar arquivos css direto nos arquivos dos componentes.

## O Arquivo \_app.tsx

    O Arquivo é um arquivo que já é criado por padrão no next e ele é um arquivo que por padrão fica em volta de todas as páginas do seu app.
    O Next tem um sistema de rotas próprio, então sempre que eu chamo qualquer rota(pagina) do meu projeto, o _app vai ser chamado também.

## O Arquivo \_document.tsx

Ele vai ficar por volta de toda a nossa aplicação mas vai ser chamado uma única vez.

## A Pasta Components

Geralmente é colocado nesta página componentes que são utilizados em mais de uma página, ou seja, componentes globais.
