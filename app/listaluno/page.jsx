"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../components/header";
import "./listaluno.css";

export default function ListAluno() {
    const [alunos, setAlunos] = useState([]);
    const [busca, setBusca] = useState("");

    useEffect(() => {
        if (typeof window === "undefined") return;
        const stored = localStorage.getItem("escola_alunos");
        if (stored) {
            setAlunos(JSON.parse(stored));
        } else {
            const initial = [
                { id: "1", nome: "Ana Clara Silva", ra: "2024001", turma: "3º Ano A - EM", email: "ana.silva@sesi.br" },
                { id: "2", nome: "Lucas Gabriel Santos", ra: "2024002", turma: "3º Ano A - EM", email: "lucas.santos@sesi.br" },
                { id: "3", nome: "Mariana Oliveira", ra: "2024003", turma: "2º Ano B - EM", email: "mariana.oliveira@sesi.br" },
                { id: "4", nome: "Pedro Henrique Lima", ra: "2024004", turma: "1º Ano A - EM", email: "pedro.lima@sesi.br" }
            ];
            localStorage.setItem("escola_alunos", JSON.stringify(initial));
            setAlunos(initial);
        }
    }, []);

    const removerAluno = (id) => {
        if (!confirm("Deseja realmente remover este aluno?")) return;
        const atualizados = alunos.filter((a) => a.id !== id);
        setAlunos(atualizados);
        localStorage.setItem("escola_alunos", JSON.stringify(atualizados));
    };

    const alunosFiltrados = alunos.filter(
        (a) =>
            a.nome.toLowerCase().includes(busca.toLowerCase()) ||
            a.ra.includes(busca) ||
            a.turma.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <>
            <Header />

            <main className="page-container" style={{ maxWidth: "1150px" }}>
                <div className="page-header">
                    <span className="page-badge">📋 ALUNOS CADASTRADOS</span>
                    <h2 className="page-title">Lista de Discentes</h2>
                    <p className="page-subtitle">
                        Consulte e gerencie os alunos matriculados no SESI Mirandópolis.
                    </p>
                </div>

                <div className="table-card">
                    <div className="search-bar-container">
                        <div className="search-input-wrapper">
                            <span className="search-icon">🔍</span>
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Buscar por nome, R.A. ou turma..."
                                value={busca}
                                onChange={(e) => setBusca(e.target.value)}
                            />
                        </div>

                        <Link href="/cadaluno" className="btn-primary" style={{ padding: "10px 20px" }}>
                            ➕ Novo Aluno
                        </Link>
                    </div>

                    <div className="table-wrapper">
                        <table className="custom-table">
                            <thead>
                                <tr>
                                    <th>R.A.</th>
                                    <th>Nome Completo</th>
                                    <th>Turma</th>
                                    <th>E-mail</th>
                                    <th style={{ textAlign: "right" }}>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {alunosFiltrados.length > 0 ? (
                                    alunosFiltrados.map((aluno) => (
                                        <tr key={aluno.id}>
                                            <td style={{ fontWeight: "700", color: "#c4b5fd" }}>{aluno.ra}</td>
                                            <td style={{ fontWeight: "600" }}>{aluno.nome}</td>
                                            <td>
                                                <span className="badge-turma">{aluno.turma}</span>
                                            </td>
                                            <td style={{ color: "#94a3b8" }}>{aluno.email}</td>
                                            <td style={{ textAlign: "right" }}>
                                                <button
                                                    className="btn-danger-sm"
                                                    onClick={() => removerAluno(aluno.id)}
                                                >
                                                    🗑️ Excluir
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="empty-state">
                                            Nenhum aluno encontrado para os critérios de busca.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </>
    );
}
