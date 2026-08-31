
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../components/header";
import "../home.css";


// Initial sample data if localStorage is empty
const INITIAL_STUDENTS = [
    { id: "1", nome: "Ana Clara Silva", ra: "2024001", turma: "3º Ano A - EM", email: "ana.silva@sesi.br" },
    { id: "2", nome: "Lucas Gabriel Santos", ra: "2024002", turma: "3º Ano A - EM", email: "lucas.santos@sesi.br" },
    { id: "3", nome: "Mariana Oliveira", ra: "2024003", turma: "2º Ano B - EM", email: "mariana.oliveira@sesi.br" },
    { id: "4", nome: "Pedro Henrique Lima", ra: "2024004", turma: "1º Ano A - EM", email: "pedro.lima@sesi.br" }
];

const INITIAL_GRADES = [
    { id: "1", alunoId: "1", alunoNome: "Ana Clara Silva", materia: "Matemática", nota: 9.5, status: "Aprovado" },
    { id: "2", alunoId: "1", alunoNome: "Ana Clara Silva", materia: "Física", nota: 8.8, status: "Aprovado" },
    { id: "3", alunoId: "2", alunoNome: "Lucas Gabriel Santos", materia: "Português", nota: 9.0, status: "Aprovado" },
    { id: "4", alunoId: "3", alunoNome: "Mariana Oliveira", materia: "Química", nota: 7.5, status: "Aprovado" },
    { id: "5", alunoId: "4", alunoNome: "Pedro Henrique Lima", materia: "História", nota: 8.2, status: "Aprovado" }
];

export default function Principal() {
    const [stats, setStats] = useState({
        alunos: 0,
        notas: 0,
        turmas: 0,
        media: "--"
    });

    useEffect(() => {
        if (typeof window === "undefined") return;

        // Initialize localStorage if empty
        let storedAlunos = localStorage.getItem("escola_alunos");
        if (!storedAlunos) {
            localStorage.setItem("escola_alunos", JSON.stringify(INITIAL_STUDENTS));
            storedAlunos = JSON.stringify(INITIAL_STUDENTS);
        }

        let storedNotas = localStorage.getItem("escola_notas");
        if (!storedNotas) {
            localStorage.setItem("escola_notas", JSON.stringify(INITIAL_GRADES));
            storedNotas = JSON.stringify(INITIAL_GRADES);
        }

        try {
            const alunosList = JSON.parse(storedAlunos) || [];
            const notasList = JSON.parse(storedNotas) || [];

            const totalAlunos = alunosList.length;
            const totalNotas = notasList.length;

            const turmasSet = new Set(alunosList.map((a) => a.turma).filter(Boolean));
            const totalTurmas = turmasSet.size;

            let mediaGeral = "--";
            if (notasList.length > 0) {
                const soma = notasList.reduce((acc, curr) => acc + Number(curr.nota || 0), 0);
                mediaGeral = (soma / notasList.length).toFixed(1);
            }

            setStats({
                alunos: totalAlunos,
                notas: totalNotas,
                turmas: totalTurmas,
                media: mediaGeral
            });
        } catch (e) {
            console.error("Erro ao carregar estatísticas:", e);
        }
    }, []);

    return (
        <>
            <Header />

            <main className="home">
                {/* HERO */}
                <section className="hero">
                    <div className="hero-content">
                        <span className="hero-badge">
                            🎓 SESI Mirandópolis • Gestão Inteligente
                        </span>

                        <h2>
                            Bem-vindo ao
                            <span> Projeto Escolas</span>
                        </h2>

                        <p>
                            Gerencie alunos, notas e informações acadêmicas do SESI Mirandópolis
                            de forma simples, rápida, organizada e visualmente deslumbrante.
                        </p>

                        <div className="hero-buttons">
                            <Link href="/cadaluno" className="btn-primary">
                                👨‍🎓 Cadastrar Aluno
                            </Link>

                            <Link href="/listaluno" className="btn-secondary">
                                📋 Ver Alunos
                            </Link>
                        </div>
                    </div>

                    <div className="hero-icon">
                        🎓
                    </div>
                </section>

                {/* ESTATÍSTICAS DINÂMICAS */}
                <section className="stats">
                    <div className="stat-card">
                        <div className="stat-icon">👨‍🎓</div>
                        <div>
                            <span>Alunos Cadastrados</span>
                            <strong>{stats.alunos}</strong>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">📝</div>
                        <div>
                            <span>Notas Registradas</span>
                            <strong>{stats.notas}</strong>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">🏫</div>
                        <div>
                            <span>Turmas Ativas</span>
                            <strong>{stats.turmas}</strong>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">📊</div>
                        <div>
                            <span>Média Geral</span>
                            <strong>{stats.media}</strong>
                        </div>
                    </div>
                </section>

                {/* AÇÕES RÁPIDAS */}
                <section className="section">
                    <div className="section-header">
                        <div>
                            <span className="section-label">
                                PAINEL DE CONTROLE
                            </span>
                            <h3>
                                O que você deseja fazer hoje?
                            </h3>
                        </div>
                    </div>

                    <div className="actions">
                        <Link href="/cadaluno" className="action-card">
                            <div className="action-icon">👨‍🎓</div>
                            <div>
                                <h4>Cadastrar aluno</h4>
                                <p>Adicione um novo estudante com RA e turma.</p>
                            </div>
                            <span className="arrow">→</span>
                        </Link>

                        <Link href="/listaluno" className="action-card">
                            <div className="action-icon">📋</div>
                            <div>
                                <h4>Lista de alunos</h4>
                                <p>Consulte, pesquise e gerencie os alunos cadastrados.</p>
                            </div>
                            <span className="arrow">→</span>
                        </Link>

                        <Link href="/notaluno" className="action-card">
                            <div className="action-icon">📝</div>
                            <div>
                                <h4>Cadastrar notas</h4>
                                <p>Lance notas por disciplina para os estudantes.</p>
                            </div>
                            <span className="arrow">→</span>
                        </Link>

                        <Link href="/listnota" className="action-card">
                            <div className="action-icon">📊</div>
                            <div>
                                <h4>Boletim e Notas</h4>
                                <p>Visualize as médias e histórico de rendimento escolar.</p>
                            </div>
                            <span className="arrow">→</span>
                        </Link>
                    </div>
                </section>

                {/* SOBRE */}
                <section className="about">
                    <div className="about-icon">🏫</div>
                    <div>
                        <span className="section-label">
                            SESI MIRANDÓPOLIS
                        </span>
                        <h3>Gestão Escolar de Alta Performance</h3>
                        <p>
                            O Projeto Escolas foi desenvolvido para centralizar a gestão pedagógica
                            e administrativa do Sesi Mirandópolis. Acompanhe a evolução das turmas,
                            cadastro de discentes e médias gerais em uma plataforma rápida, responsiva e segura.
                        </p>
                    </div>
                </section>
            </main>
        </>
    );
}