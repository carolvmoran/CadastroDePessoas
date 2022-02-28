// import Head from "next/head";
// import Image from "next/image";
import Botao from "../components/Botao";
import Layout from "../components/Layout";
import Tabela from "../components/Tabela";
import Formulario from "../components/Formulario";
import useClientes from "../hooks/useClientes";

export default function Home() {
  const {
    cliente,
    clientes,
    clienteSelecionado,
    clienteExcluido,
    novoCliente,
    salvarCliente,
    tabelaVisivel,
    exibirTabela,
  } = useClientes();

  return (
    <div
      className={`
    flex h-screen justify-center items-center
    bg-gradient-to-r from-purple-500 to-blue-600
    text-white
  `}
    >
      <Layout titulo="Cadastro Simples">
        {tabelaVisivel ? (
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
            cancelado={() => exibirTabela}
            clienteMudou={salvarCliente}
            cliente={cliente}
          />
        )}
      </Layout>
    </div>
  );
}
