'use client';

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Header from "../../components/header";
import "../editaalunos.css";

export default function EditAluno({ id: propId }) {
    const params = useParams();
    const router = useRouter();
    const id = propId || params?.id;

    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');
    const [serie, setSerie] = useState('');
    const [ra, setRa] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [statusTipo, setStatusTipo] = useState('');
    const [carregando, setCarregando] = useState(true);
    const [salvando, setSalvando] = useState(false);

    useEffect(() => {
        if (!id) {
            setCarregando(false);
            return;
        }

        async function carregarAluno() {
            setCarregando(true);
            try {
                const res = await fetch(`/api/alunos/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setNome(data.nome_aluno || data.nome || '');
                    setIdade(data.idade ? String(data.idade) : '');
                    setSerie(data.serie || '');
                    setRa(data.ra_aluno || data.ra || '');
                } else {
                    setMensagem('Aluno não encontrado');
                    setStatusTipo('erro');
                }
            } catch (error) {
                console.error("Erro ao carregar aluno:", error);
                setMensagem('Erro ao carregar dados do aluno');
                setStatusTipo('erro');
            } finally {
                setCarregando(false);
            }
        }

        carregarAluno();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensagem('');

        if (!nome || !idade || !serie || !ra) {
            setMensagem('Preencha todos os campos!');
            setStatusTipo('erro');
            return;
        }

        setSalvando(true);

        try {
            const response = await fetch('/api/alunos', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: Number(id),
                    nome,
                    idade: Number(idade),
                    serie,
                    ra
                })
            });

            const data = await response.json();

            if (response.ok) {
                setMensagem(data.mensagem || 'Aluno atualizado com sucesso!');
                setStatusTipo('sucesso');
                setTimeout(() => {
                    router.push('/listaluno');
                }, 1500);
            } else {
                setMensagem(data.mensagem || 'Erro ao atualizar aluno.');
                setStatusTipo('erro');
            }

        } catch (error) {
            console.error(error);
            setMensagem('Erro de conexão ao atualizar aluno.');
            setStatusTipo('erro');

        } finally {
            setSalvando(false);
        }
    };

    if (carregando) {
        return (
            <>
                <Header />
                <main>
                    <h2>Editar Aluno</h2>
                    <div className="loading-container">
                        Carregando dados do aluno...
                    </div>
                </main>
            </>
        );
    }

    return (
        <>
            <Header />

            <main>
                <h2>Editar Aluno #{id}</h2>

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

                    <div className="botoes-form">
                        <button type="submit" className="btn-salvar" disabled={salvando}>
                            {salvando ? 'Salvando...' : 'Salvar Alterações'}
                        </button>

                        <Link href="/listaluno" className="btn-cancelar">
                            Cancelar
                        </Link>
                    </div>

                </form>
            </main>
        </>
    );
}
