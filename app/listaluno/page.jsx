"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../components/header";
import "./listaluno.css";

export default function ListAluno() {
    return (
        <>
            <Header />

            <main>
                <h2>Lista de Alunos</h2>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Idade</th>
                            <th>Série</th>
                            <th>RA</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>nota </td>
                            <td>Kelvin Destaque</td>
                            <td>18</td>
                            <td>3A</td>
                            <td>234567</td>
                        </tr>
                    </tbody>
                </table>
            </main>
        </>
    );
}