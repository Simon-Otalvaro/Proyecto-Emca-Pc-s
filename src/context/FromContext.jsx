import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

export const FromContext = createContext();

export const FromProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/from`);
        setItems(response.data); // Asumiendo que la respuesta tiene un array de objetos
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    const fetchUser = async () => {
      try{
        const responses = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user`);
        setUsers(responses.data);
        setLoading(false);
      } catch (error) {
        setError(error)
        setLoading(false);
      }
    }
    fetchUser();
    fetchItems();
  }, []);

  return (
    <FromContext.Provider value={{ items, loading, error, users }}>
      {children}
    </FromContext.Provider>
  );
};

// Hook para utilizar el contexto
export const useFromContext = () => {
  return useContext(FromContext);
};
