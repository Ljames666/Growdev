import express from "express";

const app = express();
app.use(express.json());

app.get("/calculadora/:operation", (req, res) => {
  let op = req.params.operation;
  let { valorA, valorB } = req.query;
  let a = parseInt(valorA as string);
  let b = parseInt(valorB as string);
  let result;
  switch (op) {
    case "somar":
      result = a + b;
      res.send({ result });
      break;
    case "subtrair":
      result = a - b;
      res.send({ result });
      break;
    case "multiplicar":
      result = a * b;
      res.send({ result });
      break;
    case "dividir":
      result = a / b;
      res.send({ result });
      break;

    default:
      res.status(404).send({
        ok: false,
        mensagem: "não existem valores",
        code: 404,
      });
      break;
  }
});

// exercicio 2
let contador = 0;
app.get("/contador/", (req, res) => {
  contador++;
  if (contador == 10) {
    contador = 0;
    res.send({ fim: "Chegou à 10" });
  } else {
    res.send({
      contador,
    });
  }
});

// exercicio 3
app.get("/numeral/:num", (req, res) => {
  let numero = parseInt(req.params.num);
  let value = req.query.value as string;
  switch (value) {
    case "anterior":
      let ant = numero - 1;
      res.send({ ant });
      break;
    case "proximo":
      let prox = numero + 1;
      res.send({ prox });
      break;

    default:
      res.status(404).send({
        ok: false,
        mensagem: "não existem valores",
        code: 404,
      });
      break;
  }
});
// exercicio 4
app.get("/inverter-string", (req, res) => {
  let valor = req.query.valor as string;
  res.send(valor.split("").reverse().join(""));
});
// exercicio 5
let cons: string[] = [];
app.get("/remover-vogais", (req, res) => {
  let valor = req.query.valor as string;
  const selected = valor.split("").map((vog) => {
    if (vog !== "a" && vog !== "e" && vog !== "i" && vog !== "o" && vog !== "u") {
      return vog;
    }
  });
  cons.push(selected.join(""));
  res.send({ origenValor: valor, arraySet: cons });
});
// exercicio 6
let id = 1;
class Pessoa {
  public id: number;
  constructor(public nome: string, public idade: number) {
    this.id = id;
    id++;
  }
}
let arrayPessoas: Array<Pessoa> = [];
app.get("/adicionar-pessoa/", (req, res) => {
  let sNome = req.query.nome as string;
  let sIdade = req.query.idade as string;
  let newPessoa = new Pessoa(sNome, parseInt(sIdade));
  arrayPessoas.push(newPessoa);
  res.send({
    newPessoa,
    arrayPessoas,
  });
});

// exercicio 7

app.get("/exibir-pessoa/:id", (req, res) => {
  let id = req.params.id;
  res.send({
    pessoa: arrayPessoas[parseInt(id) - 1],
  });
});

// exercicio 8
app.get("/exibir-pessoas/", (req, res) => {
  res.send({
    pessoa: arrayPessoas.map((pessoa) => pessoa.nome),
  });
});

// exercicio 9
app.get("/remover-pessoa/:id", (req, res) => {
  let id = req.params.id;
  let exibicao = arrayPessoas[parseInt(id) - 1];
  arrayPessoas.splice(parseInt(id) - 1, 1);
  res.send({
    mensagem1: `Pessoa do index ${id} removida:`,
    exibicao,
    mensagem2: "Array:",
    arrayPessoas,
  });
});
// exercicio 10
app.get("/inverter-nomes-pessoas/", (req, res) => {
  res.send({
    pessoa: arrayPessoas.map((pessoa) => pessoa.nome.split("").reverse().join("")),
  });
});
// exercicio 11

let arrPessoas: Array<PessoaC> = [];

class PessoaC {
  constructor(public id: number, public nome: string, public idade: number, public cpf: number) {}
}
let index: number = 0;
app.post("/adicionar-pessoa", (req, res) => {
  let { nome, idade, cpf } = req.body;

  let arrayPerson = arrPessoas.findIndex((item) => item.id == index || item.cpf == cpf);

  if (arrayPerson >= 0) {
    return res.status(600).send({ send: "pessoa já cadrastada" });
  }
  let newPessoa = new PessoaC(index, nome, parseInt(idade), cpf);
  index++;
  arrPessoas.push(newPessoa);
  res.send({
    newPessoa,
    arrPessoas,
  });
});


// // exercicio 12

let alfabeto = "abcdefghijklmnopqrstuvwxyz";

app.post("/adicionar-time/", (req, res) => {
  let estado: string = req.body.estado;
  let ano: number = req.body.ano;
  let nome: string = req.body.nome;

  if (!nome && !ano && !estado) {
    res.status(406).send({
      mensagem: "Informe um nome, ano e estado",
    });
  } else {
    let alfaArray = Array.from(alfabeto);
    let arrayName = Array.from(nome);
    let plusAno = Array.from(ano.toString())
      .map(Number)
      .reduce((x, y) => x + y);
    let index = 0;
    for (const item of arrayName) {
      let indexArray = alfaArray.findIndex((letra) => letra == item);
      let modificador = 0;
      while (indexArray + plusAno - modificador >= 26) {
        modificador += 26;
      }
      let novoIndex = indexArray + plusAno - modificador;
      arrayName[index] = alfaArray[novoIndex];
      index++;
    }
    let nomeInvertido = arrayName.join("").toUpperCase();

    res.status(200).send({
      mensagem: "ok",
      resposta: nomeInvertido,
      dados: {
        nome,
        estado,
        ano,
        somaDoAno: plusAno,
      },
    });
  }
});

// exercicio 13
let boxValores: number[] = [];
app.post("/adicionar-valores-calculo", (req, res) => {
  let valor: number = JSON.parse(req.body.valor);
  let valorString: string[] = Array.from(valor.toString()); // ["2", "0", "5"]
  for (const numero of valorString) {
    if (numero == "2" || numero == "4") {
      return res.status(200).send({
        mensagem: "numero possui 2 ou 4 e não foi inserido.",
        boxValores: boxValores,
        dados: {
          valorInformado: valor,
        },
      });
    }
  }
  boxValores.push(valor);
  let soma: number = boxValores.reduce((x, y) => x + y);

  let somaEmArray: number[] = [];
  for (let x = soma; x > 0; x--) {
    if (x == 0) {
      console.log(`soma é ${x}`);
      break;
    }
    somaEmArray.unshift(x);
  }

  let impares: number[] = [];
  for (let x = 0; x <= somaEmArray.length; x++) {
    if (x % 2) {
      impares.push(x);
    }
  }
  let quantImpares: number = impares.length;

  let pares: number[] = [];
  for (let x = 1; x <= somaEmArray.length; x++) {
    if (x % 2 == 0) {
      pares.push(x);
    }
  }
  let quantPares: number = pares.length;

  res.status(201).send({
    mensagem: "ok",
    boxValores: boxValores,
    dados: {
      valorInformado: valor,
      somaValor: soma,
      somaEmArray: somaEmArray,
      quantidaDePares: quantPares,
      listaDePares: pares,
      quantidaDeImpares: quantImpares,
      listaDeImpares: impares,
    },
  });
});

// exercicio 14
// let data: Date = new Date();
// let dataFormatada: string = `${data.getDate()}/${data.getMonth()}/${data.getFullYear()}`;

interface Ientrada {
  usuarioId: string;
  milhas: number | string;
  data: string;
}

let boxClientes: Ientrada[] = [];

app.post("/cadastrar-milhas", (req, res) => {
  let usuarioId: string = req.body.usuarioId;
  let milhas = req.body.milhas;
  let data = req.body.data as string;

  let testeGeral = (usuarioId: string, milhas: any, data: string) => {
    // checa usuario presente
    if (!usuarioId) {
      return res.status(406).send({
        mensagem: "Insira um usuarioId",
        dados: {
          usuarioId,
          milhas,
          data,
          boxClientes,
        },
      });
    } // checa milhas presente
    else if (!milhas) {
      return res.status(406).send({
        mensagem: "Insira um milhas",
        dados: {
          usuarioId,
          milhas,
          data,
          boxClientes,
        },
      });
    } // checa milhas é um numero
    else if (isNaN(milhas)) {
      return res.status(418).send({
        mensagem: "milha is not a number",
        dados: {
          usuarioId,
          milhas,
          data,
          boxClientes,
        },
      });
    } // checa data presente
    else if (!data) {
      return res.status(406).send({
        mensagem: "Insira um data",
        dados: {
          usuarioId,
          milhas,
          data,
          boxClientes,
        },
      });
    } // checa formato data
    else if (Array.from(data)[2] != "/" || Array.from(data)[5] != "/" || data.length < 10) {
      // .match(/\S+/\S+/\S/) ?
      return res.status(406).send({
        mensagem: "Insira a data no formato correto",
        formatoCorreto: "dia/mes/anoCompletos",
        dados: {
          usuarioId,
          milhas,
          data,
          boxClientes,
        },
      });
    }
  };
  let informaResgate = () => {
    for (const cliente of boxClientes) {
      if (cliente.usuarioId == usuarioId) {
        if (Number(cliente.milhas) % 120000 == 0 && Number(cliente.milhas) !== 0) {
          return `Você pode resgatar milhas`;
        }
      }
    }
  };
  let condiciona = () => {
    if (Number(data.slice(6, 10)) !== 2020) {
      return 0;
    } else {
      return Number(milhas);
    }
  };

  testeGeral(usuarioId, milhas, data);

  for (const cliente of boxClientes) {
    if (cliente.usuarioId == usuarioId) {
      cliente.milhas = (Number(condiciona()) + Number(cliente.milhas)).toString();
      return res.status(200).send({
        mensagem: `adicionado ${condiciona()} milhas ao cliente Id ${
          cliente.usuarioId
        }. Total de milhas: ${cliente.milhas}`,
        dados: {
          usuarioId,
          milhas,
          data,
        },
        extras: {
          boxClientes,
        },
        resgate: informaResgate(),
      });
    }
  }

  boxClientes.push({
    usuarioId: usuarioId,
    milhas: String(condiciona()),
    data: data,
  });

  res.status(201).send({
    mensagem: `Sucesso, novo usuário Id ${usuarioId} criado. Você possui ${milhas} milhas.`,
    dados: {
      usuarioId,
      milhas,
      data,
    },
    extras: {
      boxClientes,
    },
  });
});
// exercicio 15
app.post("/cadastrar-tentativas", (req, res) => {
  let { nTentativas, nAcertos } = req.body;
  let apro = (nAcertos / nTentativas) * 100;
  if (apro < 40) {
    return res.send({
      apro,
      mensagem: "Você precisa melhorar",
    });
  } else if (apro >= 40 && apro < 60) {
    return res.send({
      apro,
      mensagem: "Muito bom,mas ainda pode ser melhor",
    });
  } else if (apro >= 60 && apro < 90) {
    return res.send({
      apro,
      mensagem: "Parabéns, seu aproveitamento é acima da média",
    });
  } else if (apro >= 90 && apro < 100) {
    return res.send({
      apro,
      mensagem: "Parabéns, você está entre os melhores",
    });
  } else if (apro == 100) {
    return res.send({
      apro,
      mensagem: "Parabéns,você é o MELHOR",
    });
  } else {
    return res.status(404).send({ mensagem: "Erro nos dados informados" });
  }
});

app.listen(3333, () => console.log("Iniciando o servidor..."));

