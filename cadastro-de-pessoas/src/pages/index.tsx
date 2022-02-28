import Head from "next/head";
import Image from "next/image";
import Botao from "../components/Botao";
import Layout from "../components/Layout";
import Tabela from "../components/Tabela";
import Formulario from "../components/Formulario";
import Cliente from "../core/Cliente";
import { useEffect, useState } from "react";
import ClienteRepositorio from "../core/ClienteRepositorio";
import ColecaoCliente from "../backend/db/ColecaoCliente";

export default function Home() {
  const repo: ClienteRepositorio = new ColecaoCliente();

  const [visivel, setVisivel] = useState<"tabela" | "form">("tabela");
  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio());
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(obterTodos, []);

  function obterTodos() {
    repo.oberTodos().then((clientes) => {
      setClientes(clientes);
      setVisivel("tabela");
    });
  }

  function clienteSelecionado(cliente: Cliente) {
    setCliente(cliente);
    setVisivel("form");
  }
  async function clienteExcluido(cliente: Cliente) {
    await repo.excluir(cliente);
    obterTodos();
  }
  function novoCliente() {
    setCliente(Cliente.vazio());
    setVisivel("form");
  }
  async function salvarCliente(cliente: Cliente) {
    await repo.salvar(cliente);
    obterTodos();
  }

  return (
    <div
      className={`
    flex h-screen justify-center items-center
    bg-gradient-to-r from-purple-500 to-blue-600
    text-white
  `}
    >
      <Layout titulo="Cadastro Simples">
        {visivel === "tabela" ? (
          <>
            <div className={`flex justify-end`}>
              <Botao onClick={novoCliente} className="mb-4">
                Novo Cliente
              </Botao>
            </div>
            <Tabela
              clientes={clientes}
              clienteSelecionado={clienteSelecionado}
              clienteExcluido={clienteExcluido}
            ></Tabela>
          </>
        ) : (
          <Formulario
            cancelado={() => setVisivel("tabela")}
            clienteMudou={salvarCliente}
            cliente={cliente}
          />
        )}
      </Layout>
    </div>
  );
}
