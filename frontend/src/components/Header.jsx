import React from 'react';
import './Header.css';

// Ícones
function CartIcon() {
  return (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
      <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7.16 14h9.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0 0 21 5H6.21l-.94-2H2v2h2l3.6 7.59-1.35 2.44C5.52 16.37 6.48 18 8 18h12v-2H8l1.16-2z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z" />
    </svg>
  );
}

function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <a href="/" className="link bold">Home</a>

        <div className="right-menu">
          <a href="/carrinho" className="link">
            <CartIcon /> Carrinho
          </a>

          <a href="/login" className="link">
            <UserIcon /> Fazer login
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Header;
