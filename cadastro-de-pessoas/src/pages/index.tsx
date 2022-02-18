import Head from "next/head";
import Image from "next/image";
import Botao from "../components/Botao";
import Layout from "../components/Layout";
import Tabela from "../components/Tabela";
import Cliente from "../core/Cliente";

export default function Home() {
  const clientes = [
    new Cliente("Ana", 34, "1"),
    new Cliente("Bia", 45, "2"),
    new Cliente("Ana", 23, "3"),
    new Cliente("João", 54, "4"),
  ];

  function clienteSelecionado(cliente: Cliente) {}
  function clienteExcluido(cliente: Cliente) {}
  return (
    <div
      className={`
    flex h-screen justify-center items-center
    bg-gradient-to-r from-purple-500 to-blue-600
    text-white
  `}
    >
      <Layout titulo="Cadastro Simples">
        <div className={`flex justify-end`}>
          <Botao className="mb-4">Novo Cliente</Botao>
        </div>
        <Tabela
          clientes={clientes}
          clienteSelecionado={clienteSelecionado}
          clienteExcluido={clienteExcluido}
        ></Tabela>
      </Layout>
    </div>
  );
}
