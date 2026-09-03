"use client";

import { useState } from "react";
import Header from "../components/header";
import "./notas.css";

export default function Notas() {
    const [aluno, setAluno] = useState("");
    const [nota1, setNota1] = useState("");
    const [nota2, setNota2] = useState("");
    const [nota3, setNota3] = useState("");

    const [trabalho1, setTrabalho1] = useState("");
    const [trabalho2, setTrabalho2] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Nota cadastrada com sucesso!");
        setAluno("");
        setNota1("");
        setNota2("");
        setNota3("");
        setTrabalho1("");
        setTrabalho2("");
    };

    return (
        <>
            <Header />

            <main>
                <h2>Cadastrar Notas</h2>

                <form className="form-notas" onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label htmlFor="aluno">Nome do Aluno</label>
                        <input
                            id="aluno"
                            type="text"
                            placeholder="Digite o nome do aluno"
                            value={aluno}
                            onChange={(e) => setAluno(e.target.value)}
                        />
                    </div>

                    <div className="form-grid">

                        <div className="form-group">
                            <label htmlFor="nota1">Nota 1</label>
                            <input
                                id="nota1"
                                type="number"
                                placeholder="Digite a nota"
                                min="0"
                                max="10"
                                step="0.1"
                                value={nota1}
                                onChange={(e) => setNota1(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="nota2">Nota 2</label>
                            <input
                                id="nota2"
                                type="number"
                                placeholder="Digite a nota"
                                min="0"
                                max="10"
                                step="0.1"
                                value={nota2}
                                onChange={(e) => setNota2(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="nota3">Nota 3</label>
                            <input
                                id="nota3"
                                type="number"
                                placeholder="Digite a nota"
                                min="0"
                                max="10"
                                step="0.1"
                                value={nota3}
                                onChange={(e) => setNota3(e.target.value)}
                            />
                        </div>

                    </div>

                    <div className="form-grid">

                        <div className="form-group">
                            <label htmlFor="trabalho1">Trabalho 1</label>
                            <input
                                id="trabalho1"
                                type="number"
                                placeholder="Digite a nota"
                                min="0"
                                max="10"
                                step="0.1"
                                value={trabalho1}
                                onChange={(e) => setTrabalho1(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="trabalho2">Trabalho 2</label>
                            <input
                                id="trabalho2"
                                type="number"
                                placeholder="Digite a nota"
                                min="0"
                                max="10"
                                step="0.1"
                                value={trabalho2}
                                onChange={(e) => setTrabalho2(e.target.value)}
                            />
                        </div>

                    </div>

                    <button type="submit">Cadastrar</button>

                </form>
            </main>
        </>
    );
}