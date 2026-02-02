import React from 'react';

// Ícones simples usando SVG embutido para evitar dependências extras
function CartIcon() {
  return (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" >
      <path d="M7 4h-2l-3 9v2h2v7h14v-7h2v-2l-3-9h-2l-1 2h-6l-1-2zm9.92 7l1.2-3h-10.24l1.2 3h7.84z"/>
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 12c2.67 0 8 1.34 8 4v4h-16v-4c0-2.66 5.33-4 8-4zm0-2c-1.38 0-2.5-1.12-2.5-2.5S10.62 5 12 5s2.5 1.12 2.5 2.5S13.38 10 12 10z"/>
    </svg>
  );
}

function Header() {
  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        <a href="/" style={{ ...styles.link, fontWeight: 'bold' }}>Home</a>
        <div style={styles.rightMenu}>
          <a href="/carrinho" style={styles.link}>
            <CartIcon /> Carrinho
          </a>
          <a href="/login" style={styles.link}>
            <UserIcon /> Fazer login
          </a>
        </div>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: '#f8fafc', // cor clara
    padding: '10px 20px',
    borderBottom: '1px solid #ddd',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  nav: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightMenu: {
    display: 'flex',
    gap: '20px',
  },
  link: {
    color: '#1f2937', // cor escura
    textDecoration: 'none',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    cursor: 'pointer',
  },
};

export default Header;
