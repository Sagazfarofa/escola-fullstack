
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../components/header";
import "./listaluno.css";

export default function ListAluno() {
    const [alunos, setAlunos] = useState([]);
    const [carregando, setCarregando] = useState(true);

    const [mensagem, setMensagem] = useState({
        texto: "",
        tipo: ""
    });

    const [termoBusca, setTermoBusca] = useState("");

    const termoLimpo = termoBusca.trim();

    const alunosFiltrados =
        termoLimpo.length >= 3
            ? alunos.filter((aluno) => {
                const nomeAluno = (
                    aluno.nome ||
                    aluno.nome_aluno ||
                    ""
                ).toLowerCase();

                return nomeAluno.includes(
                    termoLimpo.toLowerCase()
                );
            })
            : alunos;

    // Mostrar mensagem
    const mostrarMensagem = (texto, tipo) => {
        setMensagem({
            texto: texto,
            tipo: tipo
        });

        setTimeout(() => {
            setMensagem({
                texto: "",
                tipo: ""
            });
        }, 4000);
    };

    // Carregar alunos
    const carregarAlunos = async () => {
        setCarregando(true);

        try {
            const response = await fetch("/api/alunos");

            if (response.ok) {
                const data = await response.json();
                setAlunos(data);
            } else {
                mostrarMensagem(
                    "Erro ao carregar lista de alunos",
                    "erro"
                );
            }
        } catch (error) {
            console.error(
                "Erro ao buscar alunos:",
                error
            );

            mostrarMensagem(
                "Erro de conexão com o servidor",
                "erro"
            );
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        carregarAlunos();
    }, []);

    // Excluir aluno
    const handleExcluir = async (id, nome) => {
        const confirmou = window.confirm(
            `Tem certeza que deseja excluir o aluno "${nome}"?`
        );

        if (!confirmou) {
            return;
        }

        try {
            const response = await fetch("/api/alunos", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: id
                })
            });

            const data = await response.json();

            if (response.ok) {
                mostrarMensagem(
                    data.mensagem ||
                    "Aluno excluído com sucesso!",
                    "sucesso"
                );

                setAlunos((prev) =>
                    prev.filter((aluno) => {
                        const idAluno =
                            aluno.id ||
                            aluno.id_aluno;

                        return (
                            Number(idAluno) !==
                            Number(id)
                        );
                    })
                );
            } else {
                mostrarMensagem(
                    data.mensagem ||
                    "Erro ao excluir aluno",
                    "erro"
                );
            }
        } catch (error) {
            console.error(
                "Erro ao excluir aluno:",
                error
            );

            mostrarMensagem(
                "Erro ao excluir aluno",
                "erro"
            );
        }
    };

    return (
        <>
            <Header />

            <main className="container-lista">

                {/* CABEÇALHO */}
                <div className="lista-header">
                    <h2>
                        Lista de Alunos
                    </h2>

                    <Link
                        href="/cadaluno"
                        className="btn-novo-aluno"
                    >
                        + Cadastrar Aluno
                    </Link>
                </div>

                {/* MENSAGEM */}
                {mensagem.texto && (
                    <div
                        className={`alerta ${mensagem.tipo}`}
                    >
                        {mensagem.texto}
                    </div>
                )}

                {/* BARRA DE PESQUISA */}
                {!carregando && alunos.length > 0 && (
                    <div className="container-busca">
                        <div className="campo-busca">

                            <span className="icone-busca">
                                🔍
                            </span>

                            <input
                                type="text"
                                placeholder="Pesquisar aluno por nome (mínimo 3 letras)..."
                                value={termoBusca}
                                onChange={(e) =>
                                    setTermoBusca(e.target.value)
                                }
                                className="input-busca"
                            />

                            {termoBusca && (
                                <button
                                    type="button"
                                    className="btn-limpar-busca"
                                    onClick={() =>
                                        setTermoBusca("")
                                    }
                                    title="Limpar pesquisa"
                                >
                                    ✕
                                </button>
                            )}

                        </div>
                    </div>
                )}

                {/* CARREGANDO */}
                {carregando ? (
                    <div className="loading">
                        Carregando alunos...
                    </div>

                ) : alunos.length === 0 ? (

                    /* NENHUM ALUNO */
                    <div className="sem-alunos">
                        <p>
                            Nenhum aluno cadastrado ainda.
                        </p>

                        <Link
                            href="/cadaluno"
                            className="btn-novo-aluno"
                        >
                            Cadastrar o primeiro aluno
                        </Link>
                    </div>

                ) : alunosFiltrados.length === 0 ? (

                    /* NENHUM RESULTADO */
                    <div className="sem-alunos">
                        <p>
                            Nenhum aluno encontrado com a pesquisa "{termoBusca}".
                        </p>

                        <button
                            type="button"
                            className="btn-novo-aluno"
                            onClick={() => setTermoBusca("")}
                        >
                            Limpar Pesquisa
                        </button>
                    </div>

                ) : (

                    /* TABELA */
                    <table className="tabela-alunos">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Idade</th>
                                <th>Série</th>
                                <th>RA</th>
                                <th>Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {alunosFiltrados.map((aluno) => {
                                const idAluno =
                                    aluno.id ?? aluno.id_aluno;

                                const nomeAluno =
                                    aluno.nome ?? aluno.nome_aluno ?? "";

                                const raAluno =
                                    aluno.ra ?? aluno.ra_aluno ?? "";

                                return (
                                    <tr key={idAluno}>
                                        <td>
                                            #{idAluno}
                                        </td>

                                        <td>
                                            <strong>
                                                {nomeAluno}
                                            </strong>
                                        </td>

                                        <td>
                                            {aluno.idade} anos
                                        </td>

                                        <td>
                                            {aluno.serie}
                                        </td>

                                        <td>
                                            <code>
                                                {raAluno}
                                            </code>
                                        </td>

                                        {/* AÇÕES */}
                                        <td className="acoes-td">

                                            <Link
                                                href={`/editaalunos/${idAluno}`}
                                                className="btn-acao btn-editar"
                                            >
                                                ✏️ Editar
                                            </Link>

                                            <button
                                                type="button"
                                                className="btn-acao btn-excluir"
                                                onClick={() =>
                                                    handleExcluir(
                                                        idAluno,
                                                        nomeAluno
                                                    )
                                                }
                                            >
                                                🗑️ Excluir
                                            </button>

                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}

            </main>
        </>
    );
}
