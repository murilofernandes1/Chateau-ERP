"use client";

import "../globals.css";
import { useState } from "react";
import ERPLayout from "@/app/components/ERPLayout";

// ─── TYPES ────────────────────────────────────────────────────────────────
type ProjectStatus = "ativo" | "pendente" | "concluido" | "cancelado";

interface Project {
  id: number;
  name: string;
  client: string;
  clientInitials: string;
  clientColor: string;
  category: string;
  value: string;
  valueRaw: number;
  progress: number;
  status: ProjectStatus;
  start: string;
  deadline: string;
  team: string[];
  description: string;
}

// ─── DATA ─────────────────────────────────────────────────────────────────
const PROJECTS: Project[] = [
  {
    id: 1,
    name: "Residencial Alvorada",
    client: "Construtora MR",
    clientInitials: "RM",
    clientColor: "#6B7C3A",
    category: "Obra Civil",
    value: "R$ 420.000",
    valueRaw: 420000,
    progress: 72,
    status: "ativo",
    start: "Set 2024",
    deadline: "Jun 2025",
    team: ["JV", "AM", "BL"],
    description: "Construção de conjunto residencial com 24 unidades.",
  },
  {
    id: 2,
    name: "Sede Corporativa Nova Era",
    client: "Nova Era S/A",
    clientInitials: "CN",
    clientColor: "#4A6E8A",
    category: "Comercial",
    value: "R$ 1.200.000",
    valueRaw: 1200000,
    progress: 35,
    status: "ativo",
    start: "Fev 2025",
    deadline: "Dez 2025",
    team: ["JV", "TS"],
    description: "Projeto e execução de nova sede administrativa.",
  },
  {
    id: 3,
    name: "Reforma Clínica Vida+",
    client: "Dr. Paulo Saito",
    clientInitials: "PS",
    clientColor: "#8B5E3C",
    category: "Reforma",
    value: "R$ 185.000",
    valueRaw: 185000,
    progress: 90,
    status: "ativo",
    start: "Jan 2025",
    deadline: "Mai 2025",
    team: ["AM"],
    description: "Reforma completa de clínica médica com 3 consultórios.",
  },
  {
    id: 4,
    name: "Galpão Industrial Arco Norte",
    client: "LogBR Ltda.",
    clientInitials: "MF",
    clientColor: "#8B5E3C",
    category: "Industrial",
    value: "R$ 680.000",
    valueRaw: 680000,
    progress: 18,
    status: "pendente",
    start: "Mai 2025",
    deadline: "Mar 2026",
    team: ["JV", "BL", "TS"],
    description: "Construção de galpão logístico de 4.200m².",
  },
  {
    id: 5,
    name: "Condomínio Parque Sereno",
    client: "Invest Capital",
    clientInitials: "TC",
    clientColor: "#6B7C3A",
    category: "Obra Civil",
    value: "R$ 2.300.000",
    valueRaw: 2300000,
    progress: 5,
    status: "pendente",
    start: "Jun 2025",
    deadline: "Jun 2026",
    team: ["JV", "AM", "TS", "BL"],
    description: "Condomínio horizontal com 48 lotes e área de lazer.",
  },
  {
    id: 6,
    name: "Interiores Casa Bandeirantes",
    client: "Fam. Rodrigues",
    clientInitials: "RD",
    clientColor: "#A8998E",
    category: "Interiores",
    value: "R$ 95.000",
    valueRaw: 95000,
    progress: 100,
    status: "concluido",
    start: "Jul 2024",
    deadline: "Nov 2024",
    team: ["BL"],
    description:
      "Projeto de interiores completo para residência de alto padrão.",
  },
  {
    id: 7,
    name: "Restaurante Époque",
    client: "Grupo Assis",
    clientInitials: "FA",
    clientColor: "#A8998E",
    category: "Comercial",
    value: "R$ 230.000",
    valueRaw: 230000,
    progress: 0,
    status: "cancelado",
    start: "—",
    deadline: "—",
    team: [],
    description: "Projeto de restaurante fino cancelado pelo cliente.",
  },
];

const STATS = [
  {
    label: "Projetos Ativos",
    value: "3",
    icon: "fa-folder-open",
    color: "copper",
    sub: "Em execução",
  },
  {
    label: "Em Planejamento",
    value: "2",
    icon: "fa-clock",
    color: "blue",
    sub: "Aguardando início",
  },
  {
    label: "Concluídos",
    value: "1",
    icon: "fa-circle-check",
    color: "green",
    sub: "Este ano",
  },
  {
    label: "Volume Total",
    value: "R$ 5,1M",
    icon: "fa-coins",
    color: "brown",
    sub: "Todos os projetos",
  },
];

const PROGRESS_COLOR: Record<string, string> = {
  high: "green",
  mid: "blue",
  low: "copper",
  critical: "rose",
};

function getProgressColor(p: number) {
  if (p >= 80) return "green";
  if (p >= 40) return "blue";
  if (p >= 15) return "copper";
  return "rose";
}

const STATUS_LABELS: Record<ProjectStatus, string> = {
  ativo: "Ativo",
  pendente: "Pendente",
  concluido: "Concluído",
  cancelado: "Cancelado",
};

const CATEGORIES = [
  "Todos",
  "Obra Civil",
  "Comercial",
  "Reforma",
  "Industrial",
  "Interiores",
];

// ─── PAGE ─────────────────────────────────────────────────────────────────
export default function ProjetosPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<ProjectStatus | "todos">(
    "todos",
  );
  const [filterCategory, setFilterCategory] = useState("Todos");
  const [view, setView] = useState<"table" | "kanban">("table");

  const filtered = PROJECTS.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.client.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "todos" || p.status === filterStatus;
    const matchCat =
      filterCategory === "Todos" || p.category === filterCategory;
    return matchSearch && matchStatus && matchCat;
  });

  const kanbanCols: { key: ProjectStatus; label: string; color: string }[] = [
    { key: "pendente", label: "Planejamento", color: "var(--brand-copper)" },
    { key: "ativo", label: "Em Execução", color: "var(--accent-green)" },
    { key: "concluido", label: "Concluídos", color: "var(--accent-blue)" },
    { key: "cancelado", label: "Cancelados", color: "var(--accent-rose)" },
  ];

  return (
    <ERPLayout topbarTitle="Projetos">
      {/* Page header */}
      <div className="page-header">
        <div>
          <div className="page-greeting">Projetos</div>
          <div className="page-date">
            Acompanhe o andamento de todos os projetos
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-secondary btn-sm">
            <i className="fa-solid fa-file-arrow-down" /> Exportar
          </button>
          <button className="btn btn-primary btn-sm">
            <i className="fa-solid fa-plus" /> Novo Projeto
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
                placeholder="Buscar projeto ou cliente..."
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
            </div>

            {/* Status filter */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {(
                [
                  "todos",
                  "ativo",
                  "pendente",
                  "concluido",
                  "cancelado",
                ] as const
              ).map((s) => (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  className={
                    filterStatus === s
                      ? "btn btn-copper btn-sm"
                      : "btn btn-secondary btn-sm"
                  }
                >
                  {s === "todos" ? "Todos" : STATUS_LABELS[s as ProjectStatus]}
                </button>
              ))}
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
              {(["table", "kanban"] as const).map((v) => (
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
                    className={`fa-solid ${v === "table" ? "fa-list" : "fa-table-columns"}`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Category pills */}
          <div
            style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                style={{
                  padding: "4px 12px",
                  borderRadius: "var(--radius-full)",
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: "pointer",
                  border:
                    filterCategory === cat ? "none" : "1px solid var(--border)",
                  background:
                    filterCategory === cat
                      ? "var(--brand-brown)"
                      : "transparent",
                  color:
                    filterCategory === cat ? "#fff" : "var(--text-secondary)",
                  transition: "var(--transition)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── TABLE VIEW ── */}
      {view === "table" && (
        <div className="card section">
          <div className="card-body" style={{ padding: 0 }}>
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Projeto</th>
                    <th>Cliente</th>
                    <th>Categoria</th>
                    <th>Valor</th>
                    <th>Progresso</th>
                    <th>Prazo</th>
                    <th>Equipe</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td
                        colSpan={9}
                        style={{
                          textAlign: "center",
                          padding: 40,
                          color: "var(--text-muted)",
                        }}
                      >
                        <i
                          className="fa-solid fa-folder-open"
                          style={{
                            fontSize: 22,
                            marginBottom: 8,
                            display: "block",
                          }}
                        />
                        Nenhum projeto encontrado
                      </td>
                    </tr>
                  ) : (
                    filtered.map((p) => (
                      <tr key={p.id}>
                        <td>
                          <div style={{ fontWeight: 500, fontSize: 13.5 }}>
                            {p.name}
                          </div>
                          <div
                            style={{
                              fontSize: 11.5,
                              color: "var(--text-muted)",
                              marginTop: 1,
                            }}
                          >
                            {p.category}
                          </div>
                        </td>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                            }}
                          >
                            <div
                              className="avatar-placeholder avatar-sm"
                              style={{
                                background: p.clientColor + "22",
                                color: p.clientColor,
                                fontFamily: "var(--font-display)",
                              }}
                            >
                              {p.clientInitials}
                            </div>
                            <span style={{ fontSize: 13 }}>{p.client}</span>
                          </div>
                        </td>
                        <td>
                          <span className="badge badge-neutral">
                            {p.category}
                          </span>
                        </td>
                        <td style={{ fontWeight: 500 }}>{p.value}</td>
                        <td style={{ minWidth: 130 }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                            }}
                          >
                            <div
                              className="progress-bar-track"
                              style={{ flex: 1 }}
                            >
                              <div
                                className={`progress-bar-fill ${getProgressColor(p.progress)}`}
                                style={{ width: `${p.progress}%` }}
                              />
                            </div>
                            <span
                              style={{
                                fontSize: 11.5,
                                color: "var(--text-secondary)",
                                minWidth: 30,
                              }}
                            >
                              {p.progress}%
                            </span>
                          </div>
                        </td>
                        <td>
                          <div style={{ fontSize: 12.5 }}>{p.deadline}</div>
                          <div
                            style={{
                              fontSize: 11,
                              color: "var(--text-muted)",
                              marginTop: 1,
                            }}
                          >
                            Início: {p.start}
                          </div>
                        </td>
                        <td>
                          <div style={{ display: "flex", gap: -4 }}>
                            {p.team.slice(0, 3).map((t, i) => (
                              <div
                                key={i}
                                className="avatar-placeholder avatar-sm"
                                style={{
                                  background: "var(--brand-cream-dark)",
                                  color: "var(--text-secondary)",
                                  border: "2px solid var(--bg-surface)",
                                  marginLeft: i > 0 ? -6 : 0,
                                  zIndex: 3 - i,
                                }}
                              >
                                {t}
                              </div>
                            ))}
                            {p.team.length > 3 && (
                              <div
                                className="avatar-placeholder avatar-sm"
                                style={{
                                  background: "var(--bg-base)",
                                  color: "var(--text-muted)",
                                  border: "2px solid var(--bg-surface)",
                                  marginLeft: -6,
                                }}
                              >
                                +{p.team.length - 3}
                              </div>
                            )}
                          </div>
                        </td>
                        <td>
                          <span className={`status-tag ${p.status}`}>
                            {STATUS_LABELS[p.status]}
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
            <div
              style={{
                padding: "12px 16px",
                borderTop: "1px solid var(--border)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                Exibindo {filtered.length} de {PROJECTS.length} projetos
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

      {/* ── KANBAN VIEW ── */}
      {view === "kanban" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
          }}
          className="section"
        >
          {kanbanCols.map((col) => {
            const colProjects = PROJECTS.filter((p) => p.status === col.key);
            return (
              <div key={col.key}>
                {/* Column header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 12,
                    padding: "0 4px",
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: col.color,
                      }}
                    />
                    <span style={{ fontWeight: 600, fontSize: 13 }}>
                      {col.label}
                    </span>
                  </div>
                  <span
                    style={{
                      background: "var(--bg-surface)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius-full)",
                      padding: "1px 8px",
                      fontSize: 11.5,
                      fontWeight: 600,
                      color: "var(--text-secondary)",
                    }}
                  >
                    {colProjects.length}
                  </span>
                </div>

                {/* Cards */}
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                >
                  {colProjects.length === 0 ? (
                    <div
                      style={{
                        border: "2px dashed var(--border)",
                        borderRadius: "var(--radius-md)",
                        padding: "24px 16px",
                        textAlign: "center",
                        color: "var(--text-muted)",
                        fontSize: 12,
                      }}
                    >
                      <i
                        className="fa-regular fa-folder-open"
                        style={{
                          display: "block",
                          fontSize: 20,
                          marginBottom: 6,
                        }}
                      />
                      Sem projetos
                    </div>
                  ) : (
                    colProjects.map((p) => (
                      <div
                        key={p.id}
                        className="card"
                        style={{
                          cursor: "pointer",
                          transition: "var(--transition-slow)",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.boxShadow = "var(--shadow-md)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.boxShadow = "var(--shadow-sm)")
                        }
                      >
                        <div style={{ padding: "14px 16px" }}>
                          {/* Top accent line */}
                          <div
                            style={{
                              height: 3,
                              background: col.color,
                              borderRadius: "var(--radius-full)",
                              marginBottom: 12,
                            }}
                          />

                          <div
                            style={{
                              fontWeight: 600,
                              fontSize: 13,
                              marginBottom: 4,
                            }}
                          >
                            {p.name}
                          </div>
                          <div
                            style={{
                              fontSize: 12,
                              color: "var(--text-secondary)",
                              marginBottom: 12,
                            }}
                          >
                            <i
                              className="fa-solid fa-building"
                              style={{ marginRight: 5, fontSize: 11 }}
                            />
                            {p.client}
                          </div>

                          {/* Progress */}
                          {p.progress > 0 && (
                            <div style={{ marginBottom: 10 }}>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  marginBottom: 4,
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: 11,
                                    color: "var(--text-muted)",
                                  }}
                                >
                                  Progresso
                                </span>
                                <span style={{ fontSize: 11, fontWeight: 600 }}>
                                  {p.progress}%
                                </span>
                              </div>
                              <div className="progress-bar-track">
                                <div
                                  className={`progress-bar-fill ${getProgressColor(p.progress)}`}
                                  style={{ width: `${p.progress}%` }}
                                />
                              </div>
                            </div>
                          )}

                          {/* Footer */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <div
                              style={{
                                fontSize: 11.5,
                                fontWeight: 600,
                                color: "var(--brand-copper)",
                              }}
                            >
                              {p.value}
                            </div>
                            {p.deadline !== "—" && (
                              <div
                                style={{
                                  fontSize: 11,
                                  color: "var(--text-muted)",
                                }}
                              >
                                <i
                                  className="fa-regular fa-calendar"
                                  style={{ marginRight: 3 }}
                                />
                                {p.deadline}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </ERPLayout>
  );
}
