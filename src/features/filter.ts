export enum Status {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}
export interface Filter {
  query: string;
  status: Status;
}

const initialState: Filter = {
  query: '',
  status: Status.All,
};

interface SetQueryAction { type: 'filter/setQuery', payload: string }
interface SetStatusAction { type: 'filter/setStatus', payload: Status }

type Action = SetQueryAction | SetStatusAction;

export const actions = {
  setQuery: (payload: string):SetQueryAction => (
    { type: 'filter/setQuery', payload }
  ),
  setStatus: (payload: Status):SetStatusAction => ({
    type: 'filter/setStatus',
    payload,
  }),
};

const filterReducer = (state: Filter = initialState, action: Action) => {
  switch (action.type) {
    case 'filter/setQuery':
      return { ...state, query: action.payload };
    case 'filter/setStatus':
      return { ...state, status: action.payload };
    default:
      return state;
  }
};

export default filterReducer;
