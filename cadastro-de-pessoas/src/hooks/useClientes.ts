import Cliente from "../core/Cliente";
import { useEffect, useState } from "react";
import ClienteRepositorio from "../core/ClienteRepositorio";
import ColecaoCliente from "../backend/db/ColecaoCliente";
import useTabelaOuForm from "./useTabelaOuForm";

export default function useClientes() {
    const repo: ClienteRepositorio = new ColecaoCliente();

    const {   
        tabelaVisivel,
        exibirFormulario,
        exibirTabela 
    } = useTabelaOuForm();
    
    const [cliente, setCliente] = useState<Cliente>(Cliente.vazio());
    const [clientes, setClientes] = useState<Cliente[]>([]);
  
    useEffect(obterTodos, []);
  
    function obterTodos() {
      repo.obterTodos().then((clientes) => {
        setClientes(clientes);
        exibirTabela;
      });
    }
  
    function clienteSelecionado(cliente: Cliente) {
      setCliente(cliente);
      exibirFormulario;
    }
    async function clienteExcluido(cliente: Cliente) {
      await repo.excluir(cliente);
      obterTodos();
    }
    function novoCliente() {
      setCliente(Cliente.vazio());
      exibirFormulario;
    }
    async function salvarCliente(cliente: Cliente) {
      await repo.salvar(cliente);
      obterTodos();
    }

    return {
        cliente,
        clientes,
        obterTodos,
        clienteSelecionado,
        clienteExcluido,
        novoCliente,
        salvarCliente,
        tabelaVisivel,
        exibirFormulario,
        exibirTabela,
    }
}