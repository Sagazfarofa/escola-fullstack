import db from "@/app/db/banco";
import { NextResponse } from "next/server";
//listar notas pelo nome

export async function GET() {
    const notas = db.prepare(`SELECT notas.id, notas.t1, notas.t2, notas.n1, notas.n2, notas.n3, alunos.nome, alunos.ra 
    FROM notas INNER JOIN alunos ON notas.id_aluno = alunos.id_aluno ORDER BY nome`).all();
    return NextResponse.json(notas);
}

export async function Salvanotas(request){
    try{
        const dados = await request.json();
        const sql = db.prepare(`INSERT INTO notas (id_aluno, t1, t2,n1,n2,n3) VALUES (?,?,?,?,?,?)`);
        sql.run(dados.id_aluno, dados.t1,dados.t2,dados.n1,dados.n2,dados.n3)
        return NextResponse.json({
            mensagem: "Notas lançadas com sucesso!",
            notas: dados
        })
    } catch(error) {
        console.error('Erro ao realizar o lançamento', error)
    }
}
export async function editnotas(request){

}
export async function deleteAluno(request){
    
}