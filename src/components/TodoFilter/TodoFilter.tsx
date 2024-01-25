import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Status, actions as filterActions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const filter = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const onInput = (value: string) => {
    dispatch(filterActions.setQuery(value));
  };

  const onStatusChange = (value: Status) => {
    dispatch(filterActions.setStatus(value));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter.status}
            onChange={event => onStatusChange(event.target.value as Status)}
          >
            {Object.entries(Status).map(([key, value]) => (
              <option value={value} key={key}>{key}</option>
            ))}
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={filter.query}
          onChange={event => onInput(event.target.value.trimStart())}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
          />
        </span>
      </p>
    </form>
  );
};
