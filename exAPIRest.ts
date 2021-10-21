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

app.listen(3333, () => console.log("Iniciando o servidor..."));
