import db from "../../db/banco";
import { NextResponse } from "next/server";
//listar alunos pelo nome

export async function GET(){
    const alunos = db.prepare('SELECT * FROM alunos ORDER BY nome').all();
    return NextResponse.json(alunos);

}

export async function SalvaAlunos(request){
    try{
        const dados = await request.json();
        const sql = db.prepare(`INSERT INTO alunos (nome, idade, serie, ra) VALUES (?,?,?,?)`);
        sql.run(dados.nome, dados.idade,dados.serie,dados.ra)
        return NextResponse.json({
            mensagem: "Aluno cadastrado com sucesso!",
            aluno: dados
        })
    } catch(error) {
        console.error('Erro ao realizar o cadastro', error)
    }
}
export async function editAlunos(request){

}
export async function deleteAluno(request){
    
}