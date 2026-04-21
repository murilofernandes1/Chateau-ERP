"use client";

import "../globals.css";
import { useState } from "react";
import ERPLayout from "../components/ERPLayout";

// ─── TYPES ────────────────────────────────────────────────────────────────
type ClientStatus = "ativo" | "inativo" | "prospecto";

interface Client {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  city: string;
  status: ClientStatus;
  projects: number;
  totalValue: string;
  initials: string;
  color: string;
  since: string;
}

// ─── DATA ─────────────────────────────────────────────────────────────────
const CLIENTS: Client[] = [
  {
    id: 1,
    name: "Rafael Monteiro",
    company: "Construtora MR",
    email: "rafael@construtoramr.com.br",
    phone: "(11) 99812-3401",
    city: "São Paulo, SP",
    status: "ativo",
    projects: 3,
    totalValue: "R$ 1.240.000",
    initials: "RM",
    color: "#6B7C3A",
    since: "Jan 2023",
  },
  {
    id: 2,
    name: "Carla Nakamura",
    company: "Nova Era S/A",
    email: "carla@novaera.com.br",
    phone: "(11) 98745-6632",
    city: "Campinas, SP",
    status: "ativo",
    projects: 1,
    totalValue: "R$ 1.200.000",
    initials: "CN",
    color: "#4A6E8A",
    since: "Mar 2024",
  },
  {
    id: 3,
    name: "Dr. Paulo Saito",
    company: "Clínica Vida+",
    email: "paulo.saito@vidamais.med.br",
    phone: "(11) 97654-1122",
    city: "Santo André, SP",
    status: "ativo",
    projects: 2,
    totalValue: "R$ 310.000",
    initials: "PS",
    color: "#8B5E3C",
    since: "Out 2023",
  },
  {
    id: 4,
    name: "Marina Figueiredo",
    company: "LogBR Ltda.",
    email: "marina@logbr.com.br",
    phone: "(19) 99321-8870",
    city: "Jundiaí, SP",
    status: "ativo",
    projects: 1,
    totalValue: "R$ 680.000",
    initials: "MF",
    color: "#8B5E3C",
    since: "Fev 2025",
  },
  {
    id: 5,
    name: "Thiago Cavalcante",
    company: "Invest Capital",
    email: "thiago@investcapital.com",
    phone: "(11) 91234-5566",
    city: "São Paulo, SP",
    status: "ativo",
    projects: 1,
    totalValue: "R$ 2.300.000",
    initials: "TC",
    color: "#6B7C3A",
    since: "Jan 2025",
  },
  {
    id: 6,
    name: "Beatriz Lemos",
    company: "BL Arquitetura",
    email: "beatriz@blarquitetura.com.br",
    phone: "(21) 98890-4421",
    city: "Rio de Janeiro, RJ",
    status: "prospecto",
    projects: 0,
    totalValue: "—",
    initials: "BL",
    color: "#4A6E8A",
    since: "Abr 2025",
  },
  {
    id: 7,
    name: "Fernando Assis",
    company: "Grupo Assis",
    email: "fernando@grupoassis.com.br",
    phone: "(11) 95566-7780",
    city: "Sorocaba, SP",
    status: "inativo",
    projects: 2,
    totalValue: "R$ 480.000",
    initials: "FA",
    color: "#A8998E",
    since: "Mai 2022",
  },
  {
    id: 8,
    name: "Juliana Trevisan",
    company: "Trevisan & Filhos",
    email: "ju.trevisan@trevisanf.com",
    phone: "(14) 99201-3344",
    city: "Bauru, SP",
    status: "prospecto",
    projects: 0,
    totalValue: "—",
    initials: "JT",
    color: "#6B7C3A",
    since: "Abr 2025",
  },
];

const STATS = [
  {
    label: "Total de Clientes",
    value: "8",
    icon: "fa-users",
    color: "copper",
    sub: "+2 este mês",
  },
  {
    label: "Clientes Ativos",
    value: "5",
    icon: "fa-user-check",
    color: "green",
    sub: "62,5% da base",
  },
  {
    label: "Prospectos",
    value: "2",
    icon: "fa-user-clock",
    color: "blue",
    sub: "Em negociação",
  },
  {
    label: "Valor Total Gerado",
    value: "R$ 6,2M",
    icon: "fa-coins",
    color: "brown",
    sub: "Todos os projetos",
  },
];

const STATUS_LABELS: Record<ClientStatus, string> = {
  ativo: "Ativo",
  inativo: "Inativo",
  prospecto: "Prospecto",
};

// ─── PAGE ─────────────────────────────────────────────────────────────────
export default function ClientesPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<ClientStatus | "todos">(
    "todos",
  );
  const [view, setView] = useState<"table" | "cards">("table");

  const filtered = CLIENTS.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "todos" || c.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <ERPLayout topbarTitle="Clientes">
      {/* Page header */}
      <div className="page-header">
        <div>
          <div className="page-greeting">Clientes</div>
          <div className="page-date">
            Gerencie sua base de clientes e prospectos
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-secondary btn-sm">
            <i className="fa-solid fa-file-arrow-down" /> Exportar
          </button>
          <button className="btn btn-primary btn-sm">
            <i className="fa-solid fa-plus" /> Novo Cliente
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="section grid-4">
        {STATS.map((s) => (
          <div key={s.label} className="stat-card">
            <div className="stat-card-header">
              <div className={`stat-card-icon ${s.color}`}>
                <i className={`fa-solid ${s.icon}`} />
              </div>
            </div>
            <div className="stat-card-value">{s.value}</div>
            <div className="stat-card-label">{s.label}</div>
            <div className="stat-card-footer">
              <span className="stat-card-period">{s.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="card section">
        <div className="card-body" style={{ paddingTop: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            {/* Search */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "var(--bg-base)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-full)",
                padding: "7px 14px",
                flex: 1,
                minWidth: 200,
              }}
            >
              <i
                className="fa-solid fa-magnifying-glass"
                style={{ color: "var(--text-muted)", fontSize: 13 }}
              />
              <input
                type="text"
                placeholder="Buscar por nome, empresa ou cidade..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  border: "none",
                  background: "none",
                  outline: "none",
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  color: "var(--text-primary)",
                  width: "100%",
                }}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  style={{ color: "var(--text-muted)", fontSize: 12 }}
                >
                  <i className="fa-solid fa-xmark" />
                </button>
              )}
            </div>

            {/* Status filter */}
            <div style={{ display: "flex", gap: 6 }}>
              {(["todos", "ativo", "prospecto", "inativo"] as const).map(
                (s) => (
                  <button
                    key={s}
                    onClick={() => setFilterStatus(s)}
                    className={
                      filterStatus === s
                        ? "btn btn-copper btn-sm"
                        : "btn btn-secondary btn-sm"
                    }
                    style={{ textTransform: "capitalize" }}
                  >
                    {s === "todos" ? "Todos" : STATUS_LABELS[s as ClientStatus]}
                  </button>
                ),
              )}
            </div>

            {/* View toggle */}
            <div
              style={{
                display: "flex",
                gap: 2,
                background: "var(--bg-base)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)",
                padding: 2,
              }}
            >
              {(["table", "cards"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  style={{
                    padding: "5px 10px",
                    borderRadius: "var(--radius-sm)",
                    fontSize: 13,
                    transition: "var(--transition)",
                    background:
                      view === v ? "var(--bg-surface)" : "transparent",
                    color:
                      view === v ? "var(--text-primary)" : "var(--text-muted)",
                    boxShadow: view === v ? "var(--shadow-sm)" : "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <i
                    className={`fa-solid ${v === "table" ? "fa-list" : "fa-grip"}`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* TABLE VIEW */}
      {view === "table" && (
        <div className="card section">
          <div className="card-body" style={{ padding: 0 }}>
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Contato</th>
                    <th>Cidade</th>
                    <th>Projetos</th>
                    <th>Valor Total</th>
                    <th>Cliente desde</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td
                        colSpan={8}
                        style={{
                          textAlign: "center",
                          padding: 40,
                          color: "var(--text-muted)",
                        }}
                      >
                        <i
                          className="fa-solid fa-magnifying-glass"
                          style={{
                            fontSize: 20,
                            marginBottom: 8,
                            display: "block",
                          }}
                        />
                        Nenhum cliente encontrado
                      </td>
                    </tr>
                  ) : (
                    filtered.map((c) => (
                      <tr key={c.id}>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                            }}
                          >
                            <div
                              className="avatar-placeholder avatar-md"
                              style={{
                                background: c.color + "22",
                                color: c.color,
                                fontFamily: "var(--font-display)",
                              }}
                            >
                              {c.initials}
                            </div>
                            <div>
                              <div style={{ fontWeight: 500, fontSize: 13.5 }}>
                                {c.name}
                              </div>
                              <div
                                style={{
                                  fontSize: 12,
                                  color: "var(--text-secondary)",
                                }}
                              >
                                {c.company}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div style={{ fontSize: 12.5 }}>{c.email}</div>
                          <div
                            style={{
                              fontSize: 12,
                              color: "var(--text-secondary)",
                              marginTop: 1,
                            }}
                          >
                            {c.phone}
                          </div>
                        </td>
                        <td
                          style={{
                            fontSize: 13,
                            color: "var(--text-secondary)",
                          }}
                        >
                          <i
                            className="fa-solid fa-location-dot"
                            style={{
                              marginRight: 5,
                              color: "var(--text-muted)",
                              fontSize: 11,
                            }}
                          />
                          {c.city}
                        </td>
                        <td>
                          <span className="badge badge-neutral">
                            <i
                              className="fa-solid fa-folder"
                              style={{ fontSize: 10 }}
                            />{" "}
                            {c.projects}
                          </span>
                        </td>
                        <td style={{ fontWeight: 500 }}>{c.totalValue}</td>
                        <td
                          style={{
                            fontSize: 12.5,
                            color: "var(--text-secondary)",
                          }}
                        >
                          {c.since}
                        </td>
                        <td>
                          <span className={`status-tag ${c.status}`}>
                            {STATUS_LABELS[c.status]}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: "flex", gap: 4 }}>
                            <button
                              className="btn btn-ghost btn-sm"
                              style={{ padding: "5px 8px" }}
                            >
                              <i className="fa-regular fa-eye" />
                            </button>
                            <button
                              className="btn btn-ghost btn-sm"
                              style={{ padding: "5px 8px" }}
                            >
                              <i className="fa-regular fa-pen-to-square" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div
              style={{
                padding: "12px 16px",
                borderTop: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                Mostrando {filtered.length} de {CLIENTS.length} clientes
              </span>
              <div style={{ display: "flex", gap: 4 }}>
                <button className="btn btn-secondary btn-sm">
                  <i
                    className="fa-solid fa-chevron-left"
                    style={{ fontSize: 10 }}
                  />
                </button>
                <button className="btn btn-copper btn-sm">1</button>
                <button className="btn btn-secondary btn-sm">
                  <i
                    className="fa-solid fa-chevron-right"
                    style={{ fontSize: 10 }}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CARDS VIEW */}
      {view === "cards" && (
        <div className="section grid-3">
          {filtered.length === 0 ? (
            <div
              style={{
                gridColumn: "1/-1",
                textAlign: "center",
                padding: 40,
                color: "var(--text-muted)",
              }}
            >
              <i
                className="fa-solid fa-magnifying-glass"
                style={{ fontSize: 24, marginBottom: 8, display: "block" }}
              />
              Nenhum cliente encontrado
            </div>
          ) : (
            filtered.map((c) => (
              <div
                key={c.id}
                className="card"
                style={{ transition: "var(--transition-slow)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow = "var(--shadow-md)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow = "var(--shadow-sm)")
                }
              >
                <div className="card-body" style={{ padding: 20 }}>
                  {/* Header */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      marginBottom: 14,
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 12 }}
                    >
                      <div
                        className="avatar-placeholder avatar-lg"
                        style={{
                          background: c.color + "22",
                          color: c.color,
                          fontFamily: "var(--font-display)",
                        }}
                      >
                        {c.initials}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>
                          {c.name}
                        </div>
                        <div
                          style={{
                            fontSize: 12,
                            color: "var(--text-secondary)",
                          }}
                        >
                          {c.company}
                        </div>
                      </div>
                    </div>
                    <span className={`status-tag ${c.status}`}>
                      {STATUS_LABELS[c.status]}
                    </span>
                  </div>

                  <hr className="divider" style={{ margin: "12px 0" }} />

                  {/* Info */}
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 7 }}
                  >
                    {[
                      { icon: "fa-envelope", val: c.email },
                      { icon: "fa-phone", val: c.phone },
                      { icon: "fa-location-dot", val: c.city },
                    ].map((row) => (
                      <div
                        key={row.icon}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <i
                          className={`fa-solid ${row.icon}`}
                          style={{
                            width: 14,
                            color: "var(--text-muted)",
                            fontSize: 12,
                            textAlign: "center",
                          }}
                        />
                        <span
                          style={{
                            fontSize: 12.5,
                            color: "var(--text-secondary)",
                          }}
                        >
                          {row.val}
                        </span>
                      </div>
                    ))}
                  </div>

                  <hr className="divider" style={{ margin: "12px 0" }} />

                  {/* Stats */}
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ textAlign: "center" }}>
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 600,
                          fontSize: 18,
                          color: "var(--text-primary)",
                        }}
                      >
                        {c.projects}
                      </div>
                      <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                        Projetos
                      </div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 600,
                          fontSize: 18,
                          color: "var(--text-primary)",
                        }}
                      >
                        {c.totalValue}
                      </div>
                      <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                        Valor total
                      </div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 600,
                          fontSize: 18,
                          color: "var(--text-primary)",
                        }}
                      >
                        {c.since}
                      </div>
                      <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                        Cliente desde
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      style={{ flex: 1, justifyContent: "center" }}
                    >
                      <i className="fa-regular fa-eye" /> Ver perfil
                    </button>
                    <button
                      className="btn btn-copper btn-sm"
                      style={{ justifyContent: "center", padding: "6px 12px" }}
                    >
                      <i className="fa-regular fa-pen-to-square" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </ERPLayout>
  );
}
