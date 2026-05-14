import { saveData } from './helpers';

export function reducer(state, action) {
  let next;
  switch (action.type) {
    case "ADD_NOTE":
      next = { ...state, notes: [...state.notes, action.payload] };
      break;
    case "UPDATE_NOTE":
      next = { ...state, notes: state.notes.map(n => n.id === action.id ? { ...n, ...action.payload } : n) };
      break;
    case "DELETE_NOTE":
      next = { ...state, notes: state.notes.filter(n => n.id !== action.id) };
      break;
    case "SET_VIEW":
      next = { ...state, view: action.view };
      break;
    case "SET_FILTER":
      next = { ...state, filter: { ...state.filter, ...action.payload } };
      break;
    case "LOAD":
      next = { ...state, notes: action.notes };
      break;
    default:
      next = state;
  }
  saveData(next.notes);
  return next;
}
