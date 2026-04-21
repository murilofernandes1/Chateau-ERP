"use client";
import "../globals.css";
import { useState } from "react";
import ERPLayout from "@/app/components/ERPLayout";

// ─── TYPES ────────────────────────────────────────────────────────────────
type ContractStatus = "ativo" | "pendente" | "concluido" | "cancelado";

interface Contract {
  id: number;
  number: string;
  name: string;
  client: string;
  clientInitials: string;
  clientColor: string;
  type: string;
  value: string;
  valueRaw: number;
  signed: string;
  start: string;
  end: string;
  status: ContractStatus;
  paid: string;
  remaining: string;
  paidPct: number;
  description: string;
}

// ─── DATA ─────────────────────────────────────────────────────────────────
const CONTRACTS: Contract[] = [
  {
    id: 1,
    number: "CTR-2025-001",
    name: "Obra Residencial Alvorada",
    client: "Construtora MR",
    clientInitials: "RM",
    clientColor: "#6B7C3A",
    type: "Contrato de Obra",
    value: "R$ 420.000",
    valueRaw: 420000,
    signed: "02 Set 2024",
    start: "Set 2024",
    end: "Jun 2025",
    status: "ativo",
    paid: "R$ 302.400",
    remaining: "R$ 117.600",
    paidPct: 72,
    description:
      "Construção de conjunto residencial com 24 unidades no bairro Alvorada.",
  },
  {
    id: 2,
    number: "CTR-2025-002",
    name: "Sede Corporativa Nova Era",
    client: "Nova Era S/A",
    clientInitials: "CN",
    clientColor: "#4A6E8A",
    type: "Prestação de Serviços",
    value: "R$ 1.200.000",
    valueRaw: 1200000,
    signed: "10 Fev 2025",
    start: "Fev 2025",
    end: "Dez 2025",
    status: "ativo",
    paid: "R$ 420.000",
    remaining: "R$ 780.000",
    paidPct: 35,
    description:
      "Projeto, execução e gerenciamento da nova sede administrativa.",
  },
  {
    id: 3,
    number: "CTR-2025-003",
    name: "Reforma Clínica Vida+",
    client: "Dr. Paulo Saito",
    clientInitials: "PS",
    clientColor: "#8B5E3C",
    type: "Reforma",
    value: "R$ 185.000",
    valueRaw: 185000,
    signed: "15 Jan 2025",
    start: "Jan 2025",
    end: "Mai 2025",
    status: "ativo",
    paid: "R$ 166.500",
    remaining: "R$ 18.500",
    paidPct: 90,
    description: "Reforma completa de clínica médica de 3 consultórios.",
  },
  {
    id: 4,
    number: "CTR-2025-004",
    name: "Galpão Industrial Arco Norte",
    client: "LogBR Ltda.",
    clientInitials: "MF",
    clientColor: "#8B5E3C",
    type: "Prestação de Serviços",
    value: "R$ 680.000",
    valueRaw: 680000,
    signed: "28 Mar 2025",
    start: "Mai 2025",
    end: "Mar 2026",
    status: "pendente",
    paid: "R$ 68.000",
    remaining: "R$ 612.000",
    paidPct: 10,
    description: "Construção de galpão logístico 4.200m² com câmara fria.",
  },
  {
    id: 5,
    number: "CTR-2025-005",
    name: "Condomínio Parque Sereno",
    client: "Invest Capital",
    clientInitials: "TC",
    clientColor: "#6B7C3A",
    type: "Contrato de Obra",
    value: "R$ 2.300.000",
    valueRaw: 2300000,
    signed: "05 Abr 2025",
    start: "Jun 2025",
    end: "Jun 2026",
    status: "pendente",
    paid: "R$ 115.000",
    remaining: "R$ 2.185.000",
    paidPct: 5,
    description:
      "Condomínio horizontal com 48 lotes e infraestrutura completa.",
  },
  {
    id: 6,
    number: "CTR-2024-009",
    name: "Interiores Casa Bandeirantes",
    client: "Fam. Rodrigues",
    clientInitials: "RD",
    clientColor: "#A8998E",
    type: "Design de Interiores",
    value: "R$ 95.000",
    valueRaw: 95000,
    signed: "03 Jul 2024",
    start: "Jul 2024",
    end: "Nov 2024",
    status: "concluido",
    paid: "R$ 95.000",
    remaining: "R$ 0",
    paidPct: 100,
    description:
      "Projeto de interiores completo para residência de alto padrão.",
  },
  {
    id: 7,
    number: "CTR-2024-011",
    name: "Restaurante Époque",
    client: "Grupo Assis",
    clientInitials: "FA",
    clientColor: "#A8998E",
    type: "Prestação de Serviços",
    value: "R$ 230.000",
    valueRaw: 230000,
    signed: "—",
    start: "—",
    end: "—",
    status: "cancelado",
    paid: "R$ 0",
    remaining: "R$ 230.000",
    paidPct: 0,
    description:
      "Projeto de restaurante fino cancelado antes do início das obras.",
  },
];

const STATS = [
  {
    label: "Contratos Ativos",
    value: "3",
    icon: "fa-file-contract",
    color: "copper",
    sub: "Em andamento",
  },
  {
    label: "Aguardando Início",
    value: "2",
    icon: "fa-file-circle-plus",
    color: "blue",
    sub: "Assinados",
  },
  {
    label: "Concluídos",
    value: "1",
    icon: "fa-file-circle-check",
    color: "green",
    sub: "Este ano",
  },
  {
    label: "Volume Contratado",
    value: "R$ 4,88M",
    icon: "fa-sack-dollar",
    color: "brown",
    sub: "Ativos + pendentes",
  },
];

const STATUS_LABELS: Record<ContractStatus, string> = {
  ativo: "Ativo",
  pendente: "Pendente",
  concluido: "Concluído",
  cancelado: "Cancelado",
};

const TYPES = [
  "Todos",
  "Contrato de Obra",
  "Prestação de Serviços",
  "Reforma",
  "Design de Interiores",
];

// ─── PAGE ─────────────────────────────────────────────────────────────────
export default function ContratosPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<ContractStatus | "todos">(
    "todos",
  );
  const [filterType, setFilterType] = useState("Todos");
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = CONTRACTS.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.client.toLowerCase().includes(search.toLowerCase()) ||
      c.number.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "todos" || c.status === filterStatus;
    const matchType = filterType === "Todos" || c.type === filterType;
    return matchSearch && matchStatus && matchType;
  });

  const totalContratado = CONTRACTS.filter(
    (c) => c.status !== "cancelado",
  ).reduce((a, c) => a + c.valueRaw, 0);
  const totalRecebido = CONTRACTS.filter(
    (c) => c.status !== "cancelado",
  ).reduce((a, c) => a + (c.valueRaw * c.paidPct) / 100, 0);
  const recebidoPct = Math.round((totalRecebido / totalContratado) * 100);

  return (
    <ERPLayout topbarTitle="Contratos">
      {/* Page header */}
      <div className="page-header">
        <div>
          <div className="page-greeting">Contratos</div>
          <div className="page-date">
            Gerencie todos os contratos e seu financeiro
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-secondary btn-sm">
            <i className="fa-solid fa-file-arrow-down" /> Exportar
          </button>
          <button className="btn btn-primary btn-sm">
            <i className="fa-solid fa-plus" /> Novo Contrato
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

      {/* Resumo financeiro geral */}
      <div className="section grid-2-1">
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">
                <i className="fa-solid fa-chart-pie" /> Evolução do Recebimento
              </div>
              <div className="card-subtitle">
                Consolidado de todos os contratos ativos e pendentes
              </div>
            </div>
          </div>
          <div className="card-body">
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: 24,
                marginBottom: 20,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: 4,
                  }}
                >
                  Total Contratado
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 26,
                    fontWeight: 600,
                  }}
                >
                  R$ {(totalContratado / 1000000).toFixed(2).replace(".", ",")}M
                </div>
              </div>
              <div style={{ flex: 1 }} />
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: 4,
                  }}
                >
                  Já Recebido
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 26,
                    fontWeight: 600,
                    color: "var(--accent-green)",
                  }}
                >
                  R${" "}
                  {(totalRecebido / 1000)
                    .toFixed(0)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                  .000
                </div>
              </div>
            </div>
            <div className="progress-bar-track" style={{ height: 10 }}>
              <div
                className="progress-bar-fill green"
                style={{ width: `${recebidoPct}%` }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                0%
              </span>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--accent-green)",
                }}
              >
                {recebidoPct}% recebido
              </span>
              <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                100%
              </span>
            </div>
          </div>
        </div>

        {/* Mini breakdown */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <i className="fa-solid fa-layer-group" /> Por Tipo
            </div>
          </div>
          <div className="card-body">
            {[
              {
                label: "Contrato de Obra",
                count: 2,
                color: "var(--brand-green)",
              },
              {
                label: "Prestação de Serviços",
                count: 3,
                color: "var(--accent-blue)",
              },
              { label: "Reforma", count: 1, color: "var(--brand-copper)" },
              {
                label: "Design de Interiores",
                count: 1,
                color: "var(--accent-rose)",
              },
            ].map((row) => (
              <div
                key={row.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 12,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: row.color,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{ fontSize: 13, color: "var(--text-secondary)" }}
                  >
                    {row.label}
                  </span>
                </div>
                <span style={{ fontWeight: 600, fontSize: 13 }}>
                  {row.count}
                </span>
              </div>
            ))}
          </div>
        </div>
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
                minWidth: 220,
              }}
            >
              <i
                className="fa-solid fa-magnifying-glass"
                style={{ color: "var(--text-muted)", fontSize: 13 }}
              />
              <input
                type="text"
                placeholder="Buscar por número, nome ou cliente..."
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
                  {s === "todos" ? "Todos" : STATUS_LABELS[s as ContractStatus]}
                </button>
              ))}
            </div>
          </div>

          <div
            style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}
          >
            {TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                style={{
                  padding: "4px 12px",
                  borderRadius: "var(--radius-full)",
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: "pointer",
                  border: filterType === t ? "none" : "1px solid var(--border)",
                  background:
                    filterType === t ? "var(--brand-brown)" : "transparent",
                  color: filterType === t ? "#fff" : "var(--text-secondary)",
                  transition: "var(--transition)",
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contracts list — expandable rows */}
      <div
        className="section"
        style={{ display: "flex", flexDirection: "column", gap: 8 }}
      >
        {filtered.length === 0 ? (
          <div className="card">
            <div
              className="card-body"
              style={{
                textAlign: "center",
                padding: 48,
                color: "var(--text-muted)",
              }}
            >
              <i
                className="fa-solid fa-file-contract"
                style={{ fontSize: 28, display: "block", marginBottom: 10 }}
              />
              Nenhum contrato encontrado
            </div>
          </div>
        ) : (
          filtered.map((c) => {
            const isExpanded = expanded === c.id;
            return (
              <div
                key={c.id}
                className="card"
                style={{ transition: "var(--transition-slow)" }}
              >
                {/* Row header (always visible) */}
                <div
                  onClick={() => setExpanded(isExpanded ? null : c.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    padding: "16px 20px",
                    cursor: "pointer",
                    borderBottom: isExpanded
                      ? "1px solid var(--border)"
                      : "none",
                  }}
                >
                  {/* Client avatar */}
                  <div
                    className="avatar-placeholder avatar-md"
                    style={{
                      background: c.clientColor + "22",
                      color: c.clientColor,
                      fontFamily: "var(--font-display)",
                      flexShrink: 0,
                    }}
                  >
                    {c.clientInitials}
                  </div>

                  {/* Name & number */}
                  <div style={{ flex: "0 0 220px" }}>
                    <div style={{ fontWeight: 600, fontSize: 13.5 }}>
                      {c.name}
                    </div>
                    <div
                      style={{
                        fontSize: 11.5,
                        color: "var(--text-muted)",
                        marginTop: 1,
                      }}
                    >
                      <i
                        className="fa-solid fa-hashtag"
                        style={{ marginRight: 3, fontSize: 10 }}
                      />
                      {c.number}
                    </div>
                  </div>

                  {/* Client */}
                  <div style={{ flex: "0 0 160px" }}>
                    <div
                      style={{ fontSize: 12.5, color: "var(--text-secondary)" }}
                    >
                      {c.client}
                    </div>
                    <div
                      style={{
                        fontSize: 11.5,
                        color: "var(--text-muted)",
                        marginTop: 1,
                      }}
                    >
                      {c.type}
                    </div>
                  </div>

                  {/* Value */}
                  <div style={{ flex: "0 0 120px" }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>
                      {c.value}
                    </div>
                    <div
                      style={{
                        fontSize: 11.5,
                        color: "var(--text-muted)",
                        marginTop: 1,
                      }}
                    >
                      valor total
                    </div>
                  </div>

                  {/* Progress */}
                  <div style={{ flex: 1, minWidth: 120 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 5,
                      }}
                    >
                      <span
                        style={{ fontSize: 11, color: "var(--text-muted)" }}
                      >
                        Recebido
                      </span>
                      <span style={{ fontSize: 11, fontWeight: 600 }}>
                        {c.paidPct}%
                      </span>
                    </div>
                    <div className="progress-bar-track">
                      <div
                        className={`progress-bar-fill ${c.paidPct === 100 ? "green" : c.paidPct >= 50 ? "blue" : c.paidPct > 0 ? "copper" : "rose"}`}
                        style={{ width: `${c.paidPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Deadline */}
                  <div style={{ flex: "0 0 100px", textAlign: "right" }}>
                    <div style={{ fontSize: 12.5 }}>{c.end}</div>
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
                      encerramento
                    </div>
                  </div>

                  {/* Status */}
                  <div style={{ flex: "0 0 90px", textAlign: "center" }}>
                    <span className={`status-tag ${c.status}`}>
                      {STATUS_LABELS[c.status]}
                    </span>
                  </div>

                  {/* Expand icon */}
                  <i
                    className={`fa-solid fa-chevron-${isExpanded ? "up" : "down"}`}
                    style={{
                      fontSize: 12,
                      color: "var(--text-muted)",
                      flexShrink: 0,
                      transition: "var(--transition)",
                    }}
                  />
                </div>

                {/* Expanded detail */}
                {isExpanded && (
                  <div
                    style={{
                      padding: "20px 20px 20px",
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      gap: 20,
                    }}
                  >
                    {/* Descrição */}
                    <div>
                      <div
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          color: "var(--text-muted)",
                          marginBottom: 6,
                        }}
                      >
                        Descrição
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          color: "var(--text-secondary)",
                          lineHeight: 1.6,
                        }}
                      >
                        {c.description}
                      </div>
                    </div>

                    {/* Datas */}
                    <div>
                      <div
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          color: "var(--text-muted)",
                          marginBottom: 10,
                        }}
                      >
                        Datas
                      </div>
                      {[
                        {
                          icon: "fa-file-signature",
                          label: "Assinatura",
                          val: c.signed,
                        },
                        { icon: "fa-play", label: "Início", val: c.start },
                        {
                          icon: "fa-flag-checkered",
                          label: "Término",
                          val: c.end,
                        },
                      ].map((row) => (
                        <div
                          key={row.label}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            marginBottom: 8,
                          }}
                        >
                          <div
                            style={{
                              width: 28,
                              height: 28,
                              borderRadius: "var(--radius-sm)",
                              background: "var(--bg-base)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "var(--text-muted)",
                              fontSize: 12,
                            }}
                          >
                            <i className={`fa-solid ${row.icon}`} />
                          </div>
                          <div>
                            <div
                              style={{
                                fontSize: 11,
                                color: "var(--text-muted)",
                              }}
                            >
                              {row.label}
                            </div>
                            <div style={{ fontSize: 13, fontWeight: 500 }}>
                              {row.val}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Financeiro */}
                    <div>
                      <div
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          color: "var(--text-muted)",
                          marginBottom: 10,
                        }}
                      >
                        Financeiro
                      </div>
                      {[
                        {
                          label: "Valor Total",
                          val: c.value,
                          color: "var(--text-primary)",
                        },
                        {
                          label: "Já Recebido",
                          val: c.paid,
                          color: "var(--accent-green)",
                        },
                        {
                          label: "A Receber",
                          val: c.remaining,
                          color: "var(--brand-copper)",
                        },
                      ].map((row) => (
                        <div
                          key={row.label}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 8,
                            padding: "6px 10px",
                            background: "var(--bg-surface-2)",
                            borderRadius: "var(--radius-sm)",
                          }}
                        >
                          <span
                            style={{
                              fontSize: 12,
                              color: "var(--text-secondary)",
                            }}
                          >
                            {row.label}
                          </span>
                          <span
                            style={{
                              fontSize: 13,
                              fontWeight: 600,
                              color: row.color,
                            }}
                          >
                            {row.val}
                          </span>
                        </div>
                      ))}

                      <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
                        <button
                          className="btn btn-secondary btn-sm"
                          style={{ flex: 1, justifyContent: "center" }}
                        >
                          <i className="fa-regular fa-eye" /> Ver contrato
                        </button>
                        <button
                          className="btn btn-copper btn-sm"
                          style={{ flex: 1, justifyContent: "center" }}
                        >
                          <i className="fa-solid fa-pen" /> Editar
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </ERPLayout>
  );
}
