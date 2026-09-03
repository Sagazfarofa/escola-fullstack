'use client';

import { useState } from "react";
import Header from "../components/header";
import "./cadaluno.css";

export default function CadAluno() {
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');
    const [serie, setSerie] = useState('');
    const [ra, setRa] = useState('');

    return (
        <>
            <Header />

            <h2>Cadastro de Alunos</h2>

            <form>
                <label htmlFor="nome">Nome</label>
                <input
                    id="nome"
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />

                <label htmlFor="idade">Idade</label>
                <input
                    id="idade"
                    type="number"
                    value={idade}
                    onChange={(e) => setIdade(e.target.value)}
                />

                <label htmlFor="serie">Série</label>
                <input
                    id="serie"
                    type="text"
                    value={serie}
                    onChange={(e) => setSerie(e.target.value)}
                />

                <label htmlFor="ra">RA</label>
                <input
                    id="ra"
                    type="text"
                    value={ra}
                    onChange={(e) => setRa(e.target.value)}
                />

                <button type="submit">Cadastrar</button>
            </form>
        </>
    );
}