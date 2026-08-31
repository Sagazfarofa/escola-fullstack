"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../components/header";
import "../cadaluno/cadaluno.css";

const MATERIAS = [
    "Matemática",
    "Português",
    "Física",
    "Química",
    "Biologia",
    "História",
    "Geografia",
    "Educação Física",
    "Inglês"
];

export default function NotAluno() {
    const [alunos, setAlunos] = useState([]);
    const [alunoId, setAlunoId] = useState("");
    const [materia, setMateria] = useState("Matemática");
    const [nota, setNota] = useState("");
    const [mensagem, setMensagem] = useState("");

    useEffect(() => {
        if (typeof window === "undefined") return;
        const stored = localStorage.getItem("escola_alunos");
        if (stored) {
            const list = JSON.parse(stored);
            setAlunos(list);
            if (list.length > 0) setAlunoId(list[0].id);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!alunoId || nota === "") return;

        const valNota = parseFloat(nota);
        if (isNaN(valNota) || valNota < 0 || valNota > 10) {
            alert("Por favor insira uma nota válida entre 0 e 10.");
            return;
        }

        const alunoObj = alunos.find((a) => a.id === alunoId);
        const alunoNome = alunoObj ? alunoObj.nome : "Aluno Desconhecido";

        const storedNotas = localStorage.getItem("escola_notas");
        const notas = storedNotas ? JSON.parse(storedNotas) : [];

        const novaNota = {
            id: Date.now().toString(),
            alunoId,
            alunoNome,
            materia,
            nota: valNota,
            status: valNota >= 7.0 ? "Aprovado" : valNota >= 5.0 ? "Recuperação" : "Reprovado"
        };

        notas.push(novaNota);
        localStorage.setItem("escola_notas", JSON.stringify(notas));

        setMensagem(`Nota ${valNota} lançada para ${alunoNome} em ${materia}!`);
        setNota("");

        setTimeout(() => setMensagem(""), 4000);
    };

    return (
        <>
            <Header />

            <main className="page-container">
                <div className="page-header">
                    <span className="page-badge">📝 LANÇAMENTO DE NOTAS</span>
                    <h2 className="page-title">Cadastrar Notas Escolares</h2>
                    <p className="page-subtitle">
                        Registre o desempenho dos estudantes por disciplina no sistema.
                    </p>
                </div>

                <div className="form-card">
                    {mensagem && (
                        <div className="alert-success">
                            <span>✅</span> {mensagem}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-grid">
                            <div className="form-group full-width">
                                <label htmlFor="aluno">Selecione o Aluno *</label>
                                <select
                                    id="aluno"
                                    className="form-control"
                                    value={alunoId}
                                    onChange={(e) => setAlunoId(e.target.value)}
                                    required
                                >
                                    {alunos.length > 0 ? (
                                        alunos.map((a) => (
                                            <option key={a.id} value={a.id}>
                                                {a.nome} (R.A.: {a.ra} - {a.turma})
                                            </option>
                                        ))
                                    ) : (
                                        <option value="">Nenhum aluno cadastrado</option>
                                    )}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="materia">Disciplina / Matéria *</label>
                                <select
                                    id="materia"
                                    className="form-control"
                                    value={materia}
                                    onChange={(e) => setMateria(e.target.value)}
                                >
                                    {MATERIAS.map((m) => (
                                        <option key={m} value={m}>
                                            {m}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="nota">Nota (0,0 a 10,0) *</label>
                                <input
                                    type="number"
                                    id="nota"
                                    step="0.1"
                                    min="0"
                                    max="10"
                                    className="form-control"
                                    placeholder="Ex: 8.5"
                                    value={nota}
                                    onChange={(e) => setNota(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-actions">
                            <Link href="/listnota" className="btn-secondary">
                                Ver Boletim / Notas
                            </Link>
                            <button type="submit" className="btn-primary" disabled={alunos.length === 0}>
                                📝 Registrar Nota
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
}
