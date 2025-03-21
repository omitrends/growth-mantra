// import React from 'react';   
import PropTypes from 'prop-types';
import React from 'react';

const CloseButton = ({ onClick }) => {
  return (
    <button onClick={onClick} style={styles.closeButton}>×</button>
  );
};

CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const styles = {
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "#ff5c5c",
    border: "none",
    color: "#fff",
    fontSize: "24px",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    transition: "background 0.3s ease",
  },
};

export default CloseButton;