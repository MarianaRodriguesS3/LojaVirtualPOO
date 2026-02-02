import React from 'react';

function Banner() {
  return (
    <section style={styles.banner}>
      <h1 style={styles.title}>Bem-vindo à nossa loja virtual!</h1>
      <p style={styles.subtitle}>Explore nossos produtos incríveis.</p>
    </section>
  );
}

const styles = {
  banner: {
    backgroundColor: '#fff',
    maxWidth: '1200px',
    margin: '20px auto',
    padding: '30px 20px',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  title: {
    margin: 0,
    fontSize: '1.8rem',
    color: '#1f2937',
  },
  subtitle: {
    marginTop: '10px',
    fontSize: '1rem',
    color: '#4b5563',
  },
};

export default Banner;
