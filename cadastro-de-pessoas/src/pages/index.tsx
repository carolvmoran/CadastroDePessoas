import Head from "next/head";
import Image from "next/image";
import Botao from "../components/Botao";
import Layout from "../components/Layout";
import Tabela from "../components/Tabela";
import Formulario from "../components/Formulario";
import Cliente from "../core/Cliente";
import { useState } from "react";

export default function Home() {
  const [visivel, setVisivel] = useState<"tabela" | "form">("tabela");
  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio());

  const clientes = [
    new Cliente("Ana", 34, "1"),
    new Cliente("Bia", 45, "2"),
    new Cliente("Ana", 23, "3"),
    new Cliente("João", 54, "4"),
  ];

  function clienteSelecionado(cliente: Cliente) {
    setCliente(cliente);
    setVisivel("form");
  }
  function clienteExcluido(cliente: Cliente) {
    console.log(`Excluir... ${cliente.nome}`);
  }
  function novoCliente() {
    setCliente(Cliente.vazio());
    setVisivel("form");
  }
  function salvarCliente(cliente: Cliente) {
    console.log(cliente);
    setVisivel("tabela");
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
