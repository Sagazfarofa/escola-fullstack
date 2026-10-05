'use client';

import { useState } from "react";
import Header from "../components/header";
import "./cadaluno.css";

export default function CadAluno() {
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');
    const [serie, setSerie] = useState('');
    const [ra, setRa] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [statusTipo, setStatusTipo] = useState('');
    const [carregando, setCarregando] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensagem('');

        if (!nome || !idade || !serie || !ra) {
            setMensagem('Preencha todos os campos!');
            setStatusTipo('erro');
            return;
        }

        setCarregando(true);

        try {
            const response = await fetch('/api/alunos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome,
                    idade: Number(idade),
                    serie,
                    ra
                })
            });

            const data = await response.json();

            if (response.ok) {
                setMensagem(data.mensagem || 'Aluno cadastrado com sucesso!');
                setStatusTipo('sucesso');

                setNome('');
                setIdade('');
                setSerie('');
                setRa('');
            } else {
                setMensagem(data.mensagem || 'Erro ao cadastrar aluno.');
                setStatusTipo('erro');
            }

        } catch (error) {
            console.error(error);
            setMensagem('Erro de conexão ao cadastrar aluno.');
            setStatusTipo('erro');

        } finally {
            setCarregando(false);
        }
    };

    return (
        <>
            <Header />

            <main>
                <h2>Cadastro de Alunos</h2>

                {mensagem && (
                    <div className={`mensagem ${statusTipo}`}>
                        {mensagem}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <label htmlFor="nome">Nome</label>
                    <input
                        id="nome"
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Nome completo do aluno"
                        required
                    />

                    <label htmlFor="idade">Idade</label>
                    <input
                        id="idade"
                        type="number"
                        value={idade}
                        onChange={(e) => setIdade(e.target.value)}
                        placeholder="Idade (ex: 16)"
                        required
                    />

                    <label htmlFor="serie">Série</label>
                    <input
                        id="serie"
                        type="text"
                        value={serie}
                        onChange={(e) => setSerie(e.target.value)}
                        placeholder="Ex: 3º Ano A"
                        required
                    />

                    <label htmlFor="ra">RA</label>
                    <input
                        id="ra"
                        type="text"
                        value={ra}
                        onChange={(e) => setRa(e.target.value)}
                        placeholder="Número do RA"
                        required
                    />

                    <button type="submit" disabled={carregando}>
                        {carregando ? 'Cadastrando...' : 'Cadastrar Aluno'}
                    </button>

                </form>
            </main>
        </>
    );
}