import db from "@/app/db/banco";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const alunos = db.prepare("SELECT * FROM alunos").all();
        return NextResponse.json(alunos);
    } catch (error) {
        console.error("Erro ao buscar alunos:", error);
        return NextResponse.json(
            { mensagem: "Erro ao buscar alunos: " + (error.message || "") },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const dados = await request.json();

        if (!dados.nome || !dados.idade || !dados.serie || !dados.ra) {
            return NextResponse.json(
                { mensagem: "Todos os campos (nome, idade, serie, ra) são obrigatórios" },
                { status: 400 }
            );
        }

        const resultado = db
            .prepare(`
                INSERT INTO alunos (nome_aluno, idade, serie, ra_aluno)
                VALUES (?, ?, ?, ?)
            `)
            .run(dados.nome, Number(dados.idade), dados.serie, dados.ra);

        return NextResponse.json(
            { mensagem: "Aluno cadastrado com sucesso!", id: resultado.lastInsertRowid },
            { status: 201 }
        );
    } catch (error) {
        console.error("Erro ao cadastrar aluno:", error);
        return NextResponse.json(
            { mensagem: "Erro ao cadastrar aluno: " + (error.message || "") },
            { status: 500 }
        );
    }
}

export async function DELETE(request) {
    try {
        const { id } = await request.json();

        if (!id) {
            return NextResponse.json(
                { mensagem: "ID do aluno é obrigatório" },
                { status: 400 }
            );
        }

        const resultado = db
            .prepare("DELETE FROM alunos WHERE id_aluno = ?")
            .run(Number(id));

        // changes = quantas linhas foram apagadas
        if (resultado.changes === 0) {
            return NextResponse.json(
                { mensagem: "Aluno não encontrado" },
                { status: 404 }
            );
        }

        return NextResponse.json({ mensagem: "Aluno excluído com sucesso!" });

    } catch (error) {
        console.error("Erro ao excluir aluno:", error);

        return NextResponse.json(
            { mensagem: "Erro ao excluir aluno: " + (error.message || "") },
            { status: 500 }
        );
    }
}

export async function PUT(request) {
    try {
        const dados = await request.json();

        if (dados.id === undefined || dados.id === null || !dados.nome || !dados.idade || !dados.serie || !dados.ra) {
            return NextResponse.json(
                { mensagem: "Todos os campos (id, nome, idade, serie, ra) são obrigatórios" },
                { status: 400 }
            );
        }

        const resultado = db
            .prepare(`
                UPDATE alunos
                SET nome_aluno = ?, idade = ?, serie = ?, ra_aluno = ?
                WHERE id_aluno = ?
            `)
            .run(
                dados.nome,
                Number(dados.idade),
                dados.serie,
                dados.ra,
                Number(dados.id)
            );

        if (resultado.changes === 0) {
            return NextResponse.json(
                { mensagem: "Aluno não encontrado" },
                { status: 404 }
            );
        }

        return NextResponse.json({ mensagem: "Aluno atualizado com sucesso!" });

    } catch (error) {
        console.error("Erro ao atualizar aluno:", error);

        return NextResponse.json(
            { mensagem: "Erro ao atualizar aluno: " + (error.message || "") },
            { status: 500 }
        );
    }
}