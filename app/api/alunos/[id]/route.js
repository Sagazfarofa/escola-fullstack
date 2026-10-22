import db from "@/app/db/banco";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        const { id } = await params;
        const aluno = db.prepare("SELECT * FROM alunos WHERE id_aluno = ?").get(Number(id));

        if (!aluno) {
            return NextResponse.json(
                { mensagem: "Aluno não encontrado" },
                { status: 404 }
            );
        }

        return NextResponse.json(aluno);
    } catch (error) {
        console.error("Erro ao buscar aluno por ID:", error);
        return NextResponse.json(
            { mensagem: "Erro ao buscar aluno: " + (error.message || "") },
            { status: 500 }
        );
    }
}
