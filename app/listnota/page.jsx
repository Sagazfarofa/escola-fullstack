"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../components/header";
import "../listaluno/listaluno.css";
import "./listnota.css";

export default function ListNota() {
    const [notas, setNotas] = useState([]);
    const [busca, setBusca] = useState("");

    useEffect(() => {
        if (typeof window === "undefined") return;
        const stored = localStorage.getItem("escola_notas");
        if (stored) {
            setNotas(JSON.parse(stored));
        } else {
            const initial = [
                { id: "1", alunoId: "1", alunoNome: "Ana Clara Silva", materia: "Matemática", nota: 9.5, status: "Aprovado" },
                { id: "2", alunoId: "1", alunoNome: "Ana Clara Silva", materia: "Física", nota: 8.8, status: "Aprovado" },
                { id: "3", alunoId: "2", alunoNome: "Lucas Gabriel Santos", materia: "Português", nota: 9.0, status: "Aprovado" },
                { id: "4", alunoId: "3", alunoNome: "Mariana Oliveira", materia: "Química", nota: 7.5, status: "Aprovado" },
                { id: "5", alunoId: "4", alunoNome: "Pedro Henrique Lima", materia: "História", nota: 8.2, status: "Aprovado" }
            ];
            localStorage.setItem("escola_notas", JSON.stringify(initial));
            setNotas(initial);
        }
    }, []);

    const removerNota = (id) => {
        if (!confirm("Deseja realmente remover esta nota?")) return;
        const atualizadas = notas.filter((n) => n.id !== id);
        setNotas(atualizadas);
        localStorage.setItem("escola_notas", JSON.stringify(atualizadas));
    };

    const notasFiltradas = notas.filter(
        (n) =>
            n.alunoNome.toLowerCase().includes(busca.toLowerCase()) ||
            n.materia.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <>
            <Header />

            <main className="page-container" style={{ maxWidth: "1150px" }}>
                <div className="page-header">
                    <span className="page-badge">📊 RENDIMENTO ESCOLAR</span>
                    <h2 className="page-title">Boletim & Lista de Notas</h2>
                    <p className="page-subtitle">
                        Acompanhe os resultados acadêmicos dos discentes por disciplina.
                    </p>
                </div>

                <div className="table-card">
                    <div className="search-bar-container">
                        <div className="search-input-wrapper">
                            <span className="search-icon">🔍</span>
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Buscar por aluno ou matéria..."
                                value={busca}
                                onChange={(e) => setBusca(e.target.value)}
                            />
                        </div>

                        <Link href="/notaluno" className="btn-primary" style={{ padding: "10px 20px" }}>
                            ➕ Lancar Nota
                        </Link>
                    </div>

                    <div className="table-wrapper">
                        <table className="custom-table">
                            <thead>
                                <tr>
                                    <th>Aluno</th>
                                    <th>Disciplina</th>
                                    <th>Nota</th>
                                    <th>Situação</th>
                                    <th style={{ textAlign: "right" }}>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {notasFiltradas.length > 0 ? (
                                    notasFiltradas.map((nota) => (
                                        <tr key={nota.id}>
                                            <td style={{ fontWeight: "700", color: "#ffffff" }}>{nota.alunoNome}</td>
                                            <td style={{ color: "#c4b5fd", fontWeight: "600" }}>{nota.materia}</td>
                                            <td style={{ fontSize: "16px", fontWeight: "800" }}>{Number(nota.nota).toFixed(1)}</td>
                                            <td>
                                                <span
                                                    className={`badge-status ${nota.status === "Aprovado"
                                                            ? "badge-aprovado"
                                                            : nota.status === "Recuperação"
                                                                ? "badge-recuperacao"
                                                                : "badge-reprovado"
                                                        }`}
                                                >
                                                    {nota.status}
                                                </span>
                                            </td>
                                            <td style={{ textAlign: "right" }}>
                                                <button
                                                    className="btn-danger-sm"
                                                    onClick={() => removerNota(nota.id)}
                                                >
                                                    🗑️ Excluir
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="empty-state">
                                            Nenhuma nota registrada para os critérios de busca.
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
