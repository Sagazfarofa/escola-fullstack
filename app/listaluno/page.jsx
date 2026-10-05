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

    // Termo de pesquisa
    const [termoBusca, setTermoBusca] = useState("");

    // Aluno que está sendo editado
    const [alunoEditando, setAlunoEditando] = useState(null);

    // Dados do formulário de edição
    const [formEdit, setFormEdit] = useState({
        id: "",
        nome: "",
        idade: "",
        serie: "",
        ra: ""
    });


    // ==========================================
    // FILTRAR ALUNOS (Apenas a partir da 3ª letra)
    // ==========================================

    const termoLimpo = termoBusca.trim();
    const alunosFiltrados = termoLimpo.length >= 3
        ? alunos.filter((aluno) => {
            const nomeAluno = (aluno.nome || aluno.nome_aluno || "").toLowerCase();
            return nomeAluno.includes(termoLimpo.toLowerCase());
        })
        : alunos;


    // ==========================================
    // MOSTRAR MENSAGEM
    // ==========================================

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


    // ==========================================
    // BUSCAR ALUNOS
    // ==========================================

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

    
    // Carregar alunos quando abrir a página
    useEffect(() => {

        carregarAlunos();

    }, []);


    // ==========================================
    // EXCLUIR ALUNO
    // ==========================================

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
                    data.mensagem || "Aluno excluído com sucesso!",
                    "sucesso"
                );

                // Remove da tela sem precisar recarregar
                setAlunos((prev) =>
                    prev.filter((aluno) => {

                        const idAluno =
                            aluno.id || aluno.id_aluno;

                        return Number(idAluno) !== Number(id);

                    })
                );

            } else {

                mostrarMensagem(
                    data.mensagem || "Erro ao excluir aluno",
                    "erro"
                );

            }

        } catch (error) {

            console.error(
                "Erro ao excluir aluno:",
                error
            );

            mostrarMensagem(
                "Erro",
                "erro"
            );

        }
    };


    const handleAbrirEditar = (aluno) => {

        const idAluno =
            aluno.id || aluno.id_aluno;

        const nomeAluno =
            aluno.nome || aluno.nome_aluno || "";

        const raAluno =
            aluno.ra || aluno.ra_aluno || "";


        setAlunoEditando(aluno);


        setFormEdit({

            id: idAluno,

            nome: nomeAluno,

            idade: aluno.idade || "",

            serie: aluno.serie || "",

            ra: raAluno

        });

    };


    // ==========================================
    // FECHAR MODAL
    // ==========================================

    const handleFecharEditar = () => {

        setAlunoEditando(null);

    };


    // ==========================================
    // ALTERAR ALUNO
    // ==========================================

    const handleSalvarEdicao = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch("/api/alunos", {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(formEdit)

            });


            const data = await response.json();


            if (response.ok) {

                mostrarMensagem(
                    data.mensagem ||
                    "Aluno atualizado com sucesso!",
                    "sucesso"
                );

                // Fecha o modal
                handleFecharEditar();

                // Atualiza a lista
                carregarAlunos();

            } else {

                mostrarMensagem(
                    data.mensagem ||
                    "Erro ao atualizar aluno",
                    "erro"
                );

            }

        } catch (error) {

            console.error(
                "Erro ao editar aluno:",
                error
            );

            mostrarMensagem(
                "Erro",
                "erro"
            );

        }

    };


    // ==========================================
    // TELA
    // ==========================================

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

                        {termoBusca.length > 0 && termoLimpo.length < 3 && (

                            <span className="dica-busca">
                                💡 Digite pelo menos 3 letras para iniciar a pesquisa...
                            </span>

                        )}

                    </div>

                )}


                {/* CARREGANDO */}

                {carregando ? (

                    <div className="loading">

                        Carregando alunos...

                    </div>


                ) : alunos.length === 0 ? (

                    /* NENHUM ALUNO CADASTRADO */

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

                    /* NENHUM ALUNO ENCONTRADO NA PESQUISA */

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

                                <th>
                                    ID
                                </th>

                                <th>
                                    Nome
                                </th>

                                <th>
                                    Idade
                                </th>

                                <th>
                                    Série
                                </th>

                                <th>
                                    RA
                                </th>

                                <th>
                                    Ações
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {alunosFiltrados.map((aluno) => {

                                const idAluno =
                                    aluno.id ||
                                    aluno.id_aluno;

                                const nomeAluno =
                                    aluno.nome ||
                                    aluno.nome_aluno;

                                const raAluno =
                                    aluno.ra ||
                                    aluno.ra_aluno;


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


                                        {/* BOTÕES */}

                                        <td className="acoes-td">

                                            <button
                                                className="btn-acao btn-editar"
                                                onClick={() =>
                                                    handleAbrirEditar(aluno)
                                                }
                                            >
                                                ✏️ Editar
                                            </button>


                                            <button
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

                {/* ==========================================
                    MODAL DE EDIÇÃO
                ========================================== */}

                {alunoEditando && (

                    <div
                        className="modal-overlay"
                        onClick={handleFecharEditar}
                    >

                        <div
                            className="modal-conteudo"
                            onClick={(e) =>
                                e.stopPropagation()
                            }
                        >

                            <h3>
                                Editar Aluno
                            </h3>


                            <form
                                onSubmit={handleSalvarEdicao}
                            >


                                {/* NOME */}

                                <div className="form-group">

                                    <label>
                                        Nome
                                    </label>

                                    <input
                                        type="text"
                                        value={formEdit.nome}
                                        onChange={(e) =>
                                            setFormEdit({
                                                ...formEdit,
                                                nome: e.target.value
                                            })
                                        }
                                        required
                                    />

                                </div>


                                {/* IDADE */}

                                <div className="form-group">

                                    <label>
                                        Idade
                                    </label>

                                    <input
                                        type="number"
                                        value={formEdit.idade}
                                        onChange={(e) =>
                                            setFormEdit({
                                                ...formEdit,
                                                idade: e.target.value
                                            })
                                        }
                                        required
                                    />

                                </div>


                                {/* SÉRIE */}

                                <div className="form-group">

                                    <label>
                                        Série
                                    </label>

                                    <input
                                        type="text"
                                        value={formEdit.serie}
                                        onChange={(e) =>
                                            setFormEdit({
                                                ...formEdit,
                                                serie: e.target.value
                                            })
                                        }
                                        required
                                    />

                                </div>


                                {/* RA */}

                                <div className="form-group">

                                    <label>
                                        RA
                                    </label>

                                    <input
                                        type="text"
                                        value={formEdit.ra}
                                        onChange={(e) =>
                                            setFormEdit({
                                                ...formEdit,
                                                ra: e.target.value
                                            })
                                        }
                                        required
                                    />

                                </div>


                                {/* BOTÕES DO MODAL */}

                                <div className="modal-acoes">

                                    <button
                                        type="button"
                                        className="btn-cancelar"
                                        onClick={handleFecharEditar}
                                    >
                                        Cancelar
                                    </button>


                                    <button
                                        type="submit"
                                        className="btn-salvar"
                                    >
                                        Salvar Alterações
                                    </button>

                                </div>


                            </form>

                        </div>

                    </div>
                )}

            </main>

        </>

    );

}