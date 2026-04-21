"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface ERPLayoutProps {
  children: React.ReactNode;
  topbarTitle: string;
}

export default function ERPLayout({ children, topbarTitle }: ERPLayoutProps) {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: "fa-gauge-high",
      section: "Principal",
    },
    {
      href: "/clients",
      label: "Clientes",
      icon: "fa-users",
      section: "Principal",
    },
    {
      href: "/projects",
      label: "Projetos",
      icon: "fa-folder-open",
      section: "Principal",
      badge: "18",
    },
    {
      href: "/contracts",
      label: "Contratos",
      icon: "fa-file-contract",
      section: "Principal",
    },
    {
      href: "/financeiro",
      label: "Caixa & Contas",
      icon: "fa-landmark",
      section: "Financeiro",
    },
    {
      href: "/relatorios",
      label: "Relatórios",
      icon: "fa-chart-line",
      section: "Financeiro",
    },
  ];

  const footerItems = [
    { href: "/ajuda", label: "Ajuda", icon: "fa-circle-question" },
    { href: "/configuracoes", label: "Configurações", icon: "fa-gear" },
  ];

  const sections = ["Principal", "Financeiro"];

  return (
    <div className="erp-layout">
      {/* ── SIDEBAR ── */}
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
          {sections.map((section) => (
            <div key={section}>
              <div className="sidebar-section-label">{section}</div>
              {navItems
                .filter((item) => item.section === section)
                .map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`sidebar-link${pathname === item.href ? " active" : ""}`}
                  >
                    <i className={`fa-solid ${item.icon}`} />
                    {item.label}
                    {item.badge && (
                      <span className="sidebar-badge">{item.badge}</span>
                    )}
                  </Link>
                ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          {footerItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-link${pathname === item.href ? " active" : ""}`}
            >
              <i className={`fa-regular ${item.icon}`} />
              {item.label}
            </Link>
          ))}
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="main-content">
        {/* TOPBAR */}
        <header className="topbar">
          <span className="topbar-title">{topbarTitle}</span>

          <div className="topbar-search">
            <i className="fa-solid fa-magnifying-glass" />
            <input type="text" placeholder="Buscar..." />
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

        {/* PAGE CONTENT */}
        <main className="page-body">{children}</main>
      </div>
    </div>
  );
}
