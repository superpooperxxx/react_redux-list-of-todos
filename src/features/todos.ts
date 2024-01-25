import { Todo } from '../types/Todo';

interface SetAction { type: 'todos/set', payload: Todo[] }

type Action = SetAction;

export const actions = {
  set: (payload: Todo[]):SetAction => ({ type: 'todos/set', payload }),
};

const todosReducer = (state: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/set':
      return [...state, ...action.payload];
    default:
      return state;
  }
};

export default todosReducer;
