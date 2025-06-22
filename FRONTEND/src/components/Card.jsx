import React from 'react';

const styles = {
  card: {
    backgroundColor: '#fff',
    borderRadius: '1rem',
    boxShadow: '0 0.25rem 1rem rgba(0, 0, 0, 0.1)',
    padding: '1rem',
    margin: '1rem auto',
    Width: '40rem',
    width: '90%',
    transition: 'box-shadow 0.3s ease',
  },
  title: {
    color: '#555',
    fontSize: '1rem',
    marginBottom: '8px',
  },
  text: {
    color: '#222',
    fontSize: '0.95rem',
    lineHeight: '1.5',
    margin: "0 0.75rem"
  }
};

const Card = ({ confession,id }) => {
  return (
    <div style={styles.card} key={id}>
      <h3 style={styles.title}>Anonymous Confession</h3>
      <p style={styles.text}>{confession}</p>
    </div>
  );
};

export default Card;
