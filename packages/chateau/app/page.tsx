"use client";
import "./globals.css";
import Link from "next/link";

// ─── TYPES ────────────────────────────────────────────────────────────────
interface StatCard {
  label: string;
  value: string;
  sub: string;
  badge: string;
  trend: "up" | "down" | "neutral";
  iconClass: string;
  iconColor: string;
}

interface Project {
  name: string;
  client: string;
  value: string;
  progress: number;
  status: "ativo" | "pendente" | "concluido" | "cancelado";
  prazo: string;
}

interface Movement {
  desc: string;
  type: "entrada" | "saida";
  value: string;
  date: string;
}

interface Contract {
  client: string;
  type: string;
  valor: string;
  venc: string;
  initials: string;
  color: string;
}

// ─── DATA ─────────────────────────────────────────────────────────────────
const stats: StatCard[] = [
  {
    label: "Saldo em Caixa",
    value: "R$ 284.500",
    sub: "Atualizado hoje",
    badge: "+8,2%",
    trend: "up",
    iconClass: "fa-solid fa-wallet",
    iconColor: "copper",
  },
  {
    label: "Receita do Mês",
    value: "R$ 97.320",
    sub: "vs. mês anterior",
    badge: "+15%",
    trend: "up",
    iconClass: "fa-solid fa-arrow-trend-up",
    iconColor: "green",
  },
  {
    label: "Gastos do Mês",
    value: "R$ 41.880",
    sub: "vs. mês anterior",
    badge: "+3,4%",
    trend: "down",
    iconClass: "fa-solid fa-arrow-trend-down",
    iconColor: "rose",
  },
  {
    label: "Projetos Ativos",
    value: "18",
    sub: "4 vencem em 30 dias",
    badge: "2 novos",
    trend: "neutral",
    iconClass: "fa-solid fa-folder-open",
    iconColor: "blue",
  },
];

const projects: Project[] = [
  {
    name: "Residencial Alvorada",
    client: "Construtora MR",
    value: "R$ 420.000",
    progress: 72,
    status: "ativo",
    prazo: "Jun 2025",
  },
  {
    name: "Sede Corporativa Nova Era",
    client: "Nova Era S/A",
    value: "R$ 1.200.000",
    progress: 35,
    status: "ativo",
    prazo: "Dez 2025",
  },
  {
    name: "Reforma Clínica Vida+",
    client: "Dr. Paulo Saito",
    value: "R$ 185.000",
    progress: 90,
    status: "ativo",
    prazo: "Mai 2025",
  },
  {
    name: "Galpão Industrial Arco",
    client: "LogBR Ltda.",
    value: "R$ 680.000",
    progress: 18,
    status: "pendente",
    prazo: "Mar 2026",
  },
  {
    name: "Condomínio Parque Sereno",
    client: "Invest Capital",
    value: "R$ 2.300.000",
    progress: 5,
    status: "pendente",
    prazo: "Jun 2026",
  },
];

const movements: Movement[] = [
  {
    desc: "Pagamento — Fornecedor Metais Bom",
    type: "saida",
    value: "- R$ 8.400",
    date: "Hoje, 10:32",
  },
  {
    desc: "Recebimento — Construtora MR (Parcela 3)",
    type: "entrada",
    value: "+ R$ 35.000",
    date: "Hoje, 09:15",
  },
  {
    desc: "NF emitida — Dr. Paulo Saito",
    type: "entrada",
    value: "+ R$ 18.500",
    date: "Ontem, 17:00",
  },
  {
    desc: "Pagamento — Aluguel escritório",
    type: "saida",
    value: "- R$ 4.200",
    date: "Ontem, 12:00",
  },
  {
    desc: "Recebimento — Nova Era S/A (Sinal)",
    type: "entrada",
    value: "+ R$ 120.000",
    date: "20/04, 14:45",
  },
];

const contracts: Contract[] = [
  {
    client: "LogBR Ltda.",
    type: "Prestação de Serviços",
    valor: "R$ 680.000",
    venc: "30 Mai 2025",
    initials: "LB",
    color: "#4A6E8A",
  },
  {
    client: "Construtora MR",
    type: "Contrato de Obra",
    valor: "R$ 420.000",
    venc: "15 Jun 2025",
    initials: "MR",
    color: "#6B7C3A",
  },
  {
    client: "Dr. Paulo Saito",
    type: "Reforma",
    valor: "R$ 185.000",
    venc: "02 Mai 2025",
    initials: "PS",
    color: "#8B5E3C",
  },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────
function progressColor(p: number): string {
  if (p >= 80) return "green";
  if (p >= 40) return "blue";
  if (p >= 15) return "copper";
  return "rose";
}

const today = new Date().toLocaleDateString("pt-BR", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

// ─── COMPONENT ────────────────────────────────────────────────────────────
export default function DashboardPage() {
  return (
    <div className="erp-layout">
      {/* ════════════════════════════════
          SIDEBAR
      ════════════════════════════════ */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-mark">
            <div className="sidebar-logo-icon">Ch</div>
            <div>
              <div className="sidebar-logo-text">Chateau</div>
              <div className="sidebar-logo-sub">ERP Studio</div>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-section-label">Principal</div>

          <Link href="/" className="sidebar-link active">
            <i className="fa-solid fa-gauge-high" />
            Dashboard
          </Link>
          <Link href="/clientes" className="sidebar-link">
            <i className="fa-solid fa-users" />
            Clientes
          </Link>
          <Link href="/projetos" className="sidebar-link">
            <i className="fa-solid fa-folder-open" />
            Projetos
            <span className="sidebar-badge">18</span>
          </Link>
          <Link href="/contratos" className="sidebar-link">
            <i className="fa-solid fa-file-contract" />
            Contratos
          </Link>

          <div className="sidebar-section-label" style={{ marginTop: 8 }}>
            Financeiro
          </div>

          <Link href="/financeiro" className="sidebar-link">
            <i className="fa-solid fa-landmark" />
            Caixa & Contas
          </Link>
          <Link href="/relatorios" className="sidebar-link">
            <i className="fa-solid fa-chart-line" />
            Relatórios
          </Link>
        </nav>

        <div className="sidebar-footer">
          <Link href="/ajuda" className="sidebar-link">
            <i className="fa-regular fa-circle-question" />
            Ajuda
          </Link>
          <Link href="/configuracoes" className="sidebar-link">
            <i className="fa-solid fa-gear" />
            Configurações
          </Link>
        </div>
      </aside>

      {/* ════════════════════════════════
          MAIN
      ════════════════════════════════ */}
      <div className="main-content">
        {/* ── TOPBAR ── */}
        <header className="topbar">
          <span className="topbar-title">Dashboard Overview</span>

          <div className="topbar-search">
            <i className="fa-solid fa-magnifying-glass" />
            <input type="text" placeholder="Buscar projetos, clientes..." />
          </div>

          <div className="topbar-actions">
            <button className="topbar-icon-btn">
              <i className="fa-regular fa-envelope" />
            </button>
            <button className="topbar-icon-btn">
              <i className="fa-regular fa-bell" />
              <span className="topbar-notif-dot" />
            </button>
            <div className="topbar-user">
              <div className="topbar-avatar">MF</div>
              <div className="topbar-user-info">
                <div className="topbar-user-name">Murilo Fernandes</div>
                <div className="topbar-user-role">Admin</div>
              </div>
              <i
                className="fa-solid fa-chevron-down"
                style={{ fontSize: 10, color: "var(--text-muted)" }}
              />
            </div>
          </div>
        </header>

        {/* ── PAGE BODY ── */}
        <main className="page-body">
          {/* Page header */}
          <div className="page-header">
            <div>
              <div className="page-greeting">Bom dia, Murilo 👋</div>
              <div
                className="page-date"
                style={{ textTransform: "capitalize" }}
              >
                {today}
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn btn-secondary btn-sm">
                <i className="fa-solid fa-file-arrow-down" />
                Exportar
              </button>
              <button className="btn btn-primary btn-sm">
                <i className="fa-solid fa-plus" />
                Novo Projeto
              </button>
            </div>
          </div>

          {/* ── STAT CARDS ── */}
          <div className="section grid-4">
            {stats.map((s) => (
              <div key={s.label} className="stat-card">
                <div className="stat-card-header">
                  <div className={`stat-card-icon ${s.iconColor}`}>
                    <i className={s.iconClass} />
                  </div>
                  <span
                    className={`badge ${s.trend === "up" ? "badge-up" : s.trend === "down" ? "badge-down" : "badge-neutral"}`}
                  >
                    {s.trend === "up" && (
                      <i
                        className="fa-solid fa-arrow-up"
                        style={{ fontSize: 9 }}
                      />
                    )}
                    {s.trend === "down" && (
                      <i
                        className="fa-solid fa-arrow-down"
                        style={{ fontSize: 9 }}
                      />
                    )}
                    {s.badge}
                  </span>
                </div>
                <div className="stat-card-value">{s.value}</div>
                <div className="stat-card-label">{s.label}</div>
                <div className="stat-card-footer">
                  <span className="stat-card-period">{s.sub}</span>
                </div>
              </div>
            ))}
          </div>

          {/* ── MIDDLE ROW ── */}
          <div className="section grid-2-1">
            {/* Projetos em andamento */}
            <div className="card">
              <div className="card-header">
                <div>
                  <div className="card-title">
                    <i className="fa-solid fa-diagram-project" />
                    Projetos em Andamento
                  </div>
                  <div className="card-subtitle">
                    18 projetos ativos no total
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <Link href="/projetos" className="btn btn-ghost btn-sm">
                    Ver todos{" "}
                    <i
                      className="fa-solid fa-arrow-right"
                      style={{ fontSize: 11 }}
                    />
                  </Link>
                  <button className="card-menu-btn">
                    <i className="fa-solid fa-ellipsis" />
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="table-wrapper">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Projeto</th>
                        <th>Valor</th>
                        <th>Progresso</th>
                        <th>Prazo</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map((p) => (
                        <tr key={p.name}>
                          <td>
                            <div style={{ fontWeight: 500, fontSize: 13 }}>
                              {p.name}
                            </div>
                            <div
                              style={{
                                fontSize: 11.5,
                                color: "var(--text-secondary)",
                                marginTop: 1,
                              }}
                            >
                              {p.client}
                            </div>
                          </td>
                          <td style={{ fontWeight: 500 }}>{p.value}</td>
                          <td style={{ minWidth: 110 }}>
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
                                  className={`progress-bar-fill ${progressColor(p.progress)}`}
                                  style={{ width: `${p.progress}%` }}
                                />
                              </div>
                              <span
                                style={{
                                  fontSize: 11,
                                  color: "var(--text-secondary)",
                                  minWidth: 28,
                                }}
                              >
                                {p.progress}%
                              </span>
                            </div>
                          </td>
                          <td
                            style={{
                              fontSize: 12.5,
                              color: "var(--text-secondary)",
                            }}
                          >
                            {p.prazo}
                          </td>
                          <td>
                            <span className={`status-tag ${p.status}`}>
                              {p.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Movimentações recentes */}
            <div className="card">
              <div className="card-header">
                <div>
                  <div className="card-title">
                    <i className="fa-solid fa-right-left" />
                    Movimentações
                  </div>
                  <div className="card-subtitle">Últimos lançamentos</div>
                </div>
                <button className="card-menu-btn">
                  <i className="fa-solid fa-ellipsis" />
                </button>
              </div>
              <div className="card-body">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {movements.map((m, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "11px 0",
                        borderBottom:
                          i < movements.length - 1
                            ? "1px solid var(--border)"
                            : "none",
                        gap: 10,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <div
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: "var(--radius-sm)",
                            background:
                              m.type === "entrada"
                                ? "var(--accent-green-bg)"
                                : "var(--accent-rose-bg)",
                            color:
                              m.type === "entrada"
                                ? "var(--accent-green)"
                                : "var(--accent-rose)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            fontSize: 13,
                          }}
                        >
                          <i
                            className={
                              m.type === "entrada"
                                ? "fa-solid fa-arrow-down-to-line"
                                : "fa-solid fa-arrow-up-from-line"
                            }
                          />
                        </div>
                        <div>
                          <div
                            style={{
                              fontSize: 12.5,
                              fontWeight: 500,
                              lineHeight: 1.3,
                            }}
                          >
                            {m.desc}
                          </div>
                          <div
                            style={{
                              fontSize: 11,
                              color: "var(--text-muted)",
                              marginTop: 1,
                            }}
                          >
                            {m.date}
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: 13,
                          color:
                            m.type === "entrada"
                              ? "var(--accent-green)"
                              : "var(--accent-rose)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 14 }}>
                  <Link
                    href="/financeiro"
                    className="btn btn-secondary btn-sm"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    <i className="fa-solid fa-list" />
                    Ver extrato completo
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ── BOTTOM ROW ── */}
          <div className="section grid-2">
            {/* Contratos a vencer */}
            <div className="card">
              <div className="card-header">
                <div>
                  <div className="card-title">
                    <i className="fa-solid fa-file-signature" />
                    Contratos Próximos do Vencimento
                  </div>
                  <div className="card-subtitle">Nos próximos 60 dias</div>
                </div>
                <Link href="/contratos" className="btn btn-ghost btn-sm">
                  Ver todos{" "}
                  <i
                    className="fa-solid fa-chevron-right"
                    style={{ fontSize: 10 }}
                  />
                </Link>
              </div>
              <div className="card-body">
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                >
                  {contracts.map((c, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "12px 14px",
                        background: "var(--bg-surface-2)",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius-md)",
                        transition: "var(--transition)",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.borderColor =
                          "var(--border-strong)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.borderColor = "var(--border)")
                      }
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
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 500, fontSize: 13 }}>
                          {c.client}
                        </div>
                        <div
                          style={{
                            fontSize: 11.5,
                            color: "var(--text-secondary)",
                            marginTop: 1,
                          }}
                        >
                          {c.type}
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>
                          {c.valor}
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: "var(--text-muted)",
                            marginTop: 1,
                          }}
                        >
                          <i
                            className="fa-regular fa-calendar"
                            style={{ marginRight: 3 }}
                          />
                          {c.venc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Resumo de Caixa */}
            <div className="card">
              <div className="card-header">
                <div>
                  <div className="card-title">
                    <i className="fa-solid fa-coins" />
                    Resumo de Caixa — Abril 2025
                  </div>
                  <div className="card-subtitle">Receitas vs. Despesas</div>
                </div>
                <button className="card-menu-btn">
                  <i className="fa-solid fa-ellipsis" />
                </button>
              </div>
              <div className="card-body">
                {/* Saldo destaque */}
                <div
                  style={{
                    background:
                      "linear-gradient(135deg, var(--brand-brown) 0%, var(--brand-brown-mid) 100%)",
                    borderRadius: "var(--radius-md)",
                    padding: "20px",
                    marginBottom: 20,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: -24,
                      right: -24,
                      width: 90,
                      height: 90,
                      borderRadius: "50%",
                      background: "rgba(139,94,60,0.25)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: -16,
                      right: 20,
                      opacity: 0.07,
                      fontSize: 64,
                    }}
                  >
                    <i className="fa-solid fa-building-columns" />
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: "rgba(255,255,255,0.5)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: 6,
                    }}
                  >
                    Saldo Atual
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 30,
                      fontWeight: 600,
                      color: "#fff",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    R$ 284.500
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "rgba(255,255,255,0.45)",
                      marginTop: 4,
                    }}
                  >
                    <i
                      className="fa-solid fa-university"
                      style={{ marginRight: 5 }}
                    />
                    Conta Principal — Bradesco
                  </div>
                </div>

                {/* Barras */}
                {[
                  {
                    label: "Receitas",
                    value: "R$ 97.320",
                    color: "green",
                    pct: "70%",
                  },
                  {
                    label: "Despesas",
                    value: "R$ 41.880",
                    color: "rose",
                    pct: "30%",
                  },
                  {
                    label: "A Receber (previsto)",
                    value: "R$ 215.000",
                    color: "copper",
                    pct: "55%",
                  },
                ].map((row) => (
                  <div key={row.label} style={{ marginBottom: 14 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 6,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 12.5,
                          color: "var(--text-secondary)",
                        }}
                      >
                        {row.label}
                      </span>
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color:
                            row.color === "green"
                              ? "var(--accent-green)"
                              : row.color === "rose"
                                ? "var(--accent-rose)"
                                : "var(--brand-copper)",
                        }}
                      >
                        {row.value}
                      </span>
                    </div>
                    <div className="progress-bar-track">
                      <div
                        className={`progress-bar-fill ${row.color}`}
                        style={{ width: row.pct }}
                      />
                    </div>
                  </div>
                ))}

                <hr className="divider" />

                <div style={{ display: "flex", gap: 10 }}>
                  <Link
                    href="/financeiro"
                    className="btn btn-secondary btn-sm"
                    style={{ flex: 1, justifyContent: "center" }}
                  >
                    <i className="fa-solid fa-chart-bar" />
                    Detalhar
                  </Link>
                  <button
                    className="btn btn-copper btn-sm"
                    style={{ flex: 1, justifyContent: "center" }}
                  >
                    <i className="fa-solid fa-plus" />
                    Lançamento
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
