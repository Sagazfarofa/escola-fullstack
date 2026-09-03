"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./header.css";

const NAV_ITEMS = [
    { href: "/", label: "Início" },
    { href: "/cadaluno", label: "Cadastrar Aluno" },
    { href: "/listaluno", label: "Lista de Alunos" },
    { href: "/alunonota", label: "Cadastrar Notas" },
    { href: "/listanota", label: "Lista de Notas" },
];

export default function Header() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="header">
            <div className="header-container">

                <Link
                    href="/"
                    className="logo"
                    onClick={() => setMenuOpen(false)}
                >
                    <span className="logo-icon">🎓</span>

                    <div>
                        <h1>Projeto Escolas</h1>

                        <span className="logo-subtitle">
                            Sistema de Gestão Escolar
                        </span>
                    </div>
                </Link>

                <button
                    className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
                    onClick={() => setMenuOpen((open) => !open)}
                    aria-label="Abrir menu de navegação"
                    aria-expanded={menuOpen}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <nav className={`nav ${menuOpen ? "nav-open" : ""}`}>
                    <ul>
                        {NAV_ITEMS.map((item) => {
                            const isActive =
                                item.href === "/"
                                    ? pathname === "/"
                                    : pathname.startsWith(item.href);

                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={isActive ? "active" : ""}
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

            </div>
        </header>
    );
}