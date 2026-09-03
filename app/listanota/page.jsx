"use client";

import { useState } from "react";
import Header from "../components/header";
import "./listanota.css";

export default function ListaNota() {
    const [listaNotas] = useState([
        { id: 1, aluno: "Kelvin Destaque", nota1: "8.5", nota2: "9.0", nota3: "7.5", trabalho1: "8.0", trabalho2: "9.5" },
        { id: 2, aluno: "Ana Silva", nota1: "9.0", nota2: "9.5", nota3: "8.0", trabalho1: "8.5", trabalho2: "10.0" },
        { id: 3, aluno: "Carlos Oliveira", nota1: "7.0", nota2: "8.0", nota3: "6.5", trabalho1: "7.5", trabalho2: "8.0" }
    ]);

    return (
        <>
            <Header />

            <main>
                <h2>Lista de Notas dos Alunos</h2>

                <table>
                    <thead>
                        <tr>
                            <th>Aluno</th>
                            <th>Nota 1</th>
                            <th>Nota 2</th>
                            <th>Nota 3</th>
                            <th>Trabalho 1</th>
                            <th>Trabalho 2</th>
                        </tr>
                    </thead>

                    <tbody>
                        {listaNotas.map((item) => (
                            <tr key={item.id}>
                                <td>{item.aluno}</td>
                                <td>{item.nota1}</td>
                                <td>{item.nota2}</td>
                                <td>{item.nota3}</td>
                                <td>{item.trabalho1}</td>
                                <td>{item.trabalho2}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </>
    );
}