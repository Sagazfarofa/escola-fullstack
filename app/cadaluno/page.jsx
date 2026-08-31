"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "../components/header";
import "./cadaluno.css";

export default function CadAluno() {
    const [nome, setNome] = useState("");
    const [ra, setRa] = useState("");
    const [turma, setTurma] = useState("3º Ano A - EM");
    const [email, setEmail] = useState("");
    const [mensagem, setMensagem] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nome || !ra) return;

        const stored = localStorage.getItem("escola_alunos");
        const alunos = stored ? JSON.parse(stored) : [];

        const novoAluno = {
            id: Date.now().toString(),
            nome,
            ra,
            turma,
            email: email || `${ra}@sesi.br`
        };

        alunos.push(novoAluno);
        localStorage.setItem("escola_alunos", JSON.stringify(alunos));

        setMensagem(`Aluno "${nome}" cadastrado com sucesso!`);
        setNome("");
        setRa("");
        setEmail("");

        setTimeout(() => setMensagem(""), 4000);
    };

    return (
        <>
            <Header />

            <main className="page-container">
                <div className="page-header">
                    <span className="page-badge">👨‍🎓 CADASTRO DISCENTE</span>
                    <h2 className="page-title">Cadastrar Novo Aluno</h2>
                    <p className="page-subtitle">
                        Preencha os dados do estudante para incluir no registro escolar do SESI Mirandópolis.
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
                                <label htmlFor="nome">Nome Completo do Aluno *</label>
                                <input
                                    type="text"
                                    id="nome"
                                    className="form-control"
                                    placeholder="Ex: Gabriel Souza Santos"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="ra">Número do R.A. (Registro Acadêmico) *</label>
                                <input
                                    type="text"
                                    id="ra"
                                    className="form-control"
                                    placeholder="Ex: 2024099"
                                    value={ra}
                                    onChange={(e) => setRa(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="turma">Turma / Ano Escolar *</label>
                                <select
                                    id="turma"
                                    className="form-control"
                                    value={turma}
                                    onChange={(e) => setTurma(e.target.value)}
                                >
                                    <option value="1º Ano A - EM">1º Ano A - EM</option>
                                    <option value="1º Ano B - EM">1º Ano B - EM</option>
                                    <option value="2º Ano A - EM">2º Ano A - EM</option>
                                    <option value="2º Ano B - EM">2º Ano B - EM</option>
                                    <option value="3º Ano A - EM">3º Ano A - EM</option>
                                    <option value="3º Ano B - EM">3º Ano B - EM</option>
                                </select>
                            </div>

                            <div className="form-group full-width">
                                <label htmlFor="email">E-mail Institucional (Opcional)</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="form-control"
                                    placeholder="aluno@sesi.br"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="form-actions">
                            <Link href="/listaluno" className="btn-secondary">
                                Ver Lista de Alunos
                            </Link>
                            <button type="submit" className="btn-primary">
                                ➕ Cadastrar Aluno
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
}
