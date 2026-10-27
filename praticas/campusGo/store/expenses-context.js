// Contexto de despesas da Aula 09 (copie aqui o seu arquivo original se preferir).
import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@expenses';
const ExpensesContext = createContext(null);

function expensesReducer(state, action) {
  switch (action.type) {
    case 'SET':
      return action.payload;
    case 'ADD':
      return [action.payload, ...state];
    case 'UPDATE':
      return state.map((e) => (e.id === action.payload.id ? { ...e, ...action.payload } : e));
    case 'DELETE':
      return state.filter((e) => e.id !== action.payload);
    default:
      return state;
  }
}

export function ExpensesContextProvider({ children }) {
  const [expenses, dispatch] = useReducer(expensesReducer, []);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) dispatch({ type: 'SET', payload: JSON.parse(raw) });
      } catch (e) {
        console.warn('Falha ao ler despesas', e);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (loaded) AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses)).catch(() => {});
  }, [expenses, loaded]);

  const value = {
    expenses,
    addExpense: (data) =>
      dispatch({ type: 'ADD', payload: { id: String(Date.now()), ...data } }),
    updateExpense: (id, data) => dispatch({ type: 'UPDATE', payload: { id, ...data } }),
    deleteExpense: (id) => dispatch({ type: 'DELETE', payload: id }),
  };

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export function useExpenses() {
  const ctx = useContext(ExpensesContext);
  if (!ctx) throw new Error('useExpenses deve ser usado dentro de ExpensesContextProvider');
  return ctx;
}
