import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './head.css';
const Header = ({ users, handleUsuarioChange, user }) => {
  return (
    <div className="header">
      <h1 className="title">Rico Tienda</h1>
      <div className="user-select">
        <div className="custom-select">
        <select className="form-select" value={user} onChange={handleUsuarioChange}>
            <option value="" disabled hidden>Selecciona un user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>{user.nombre}</option>
            ))}
          </select>
          <div className="select-icon">
            <FontAwesomeIcon icon={faUser} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
