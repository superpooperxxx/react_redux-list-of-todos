/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Filter, Status } from '../../features/filter';
import { Todo } from '../../types/Todo';
import { actions as currentTodoAction } from '../../features/currentTodo';

const filterTodos = (todos: Todo[], filter: Filter): Todo[] => {
  let filteredTodos = [...todos];

  if (filter.query) {
    const normalizedQuery = filter.query.toLowerCase().trim();

    filteredTodos = filteredTodos.filter(todo => todo.title.toLowerCase().includes(normalizedQuery));
  }

  if (filter.status !== Status.All) {
    filteredTodos = filteredTodos.filter(todo => {
      if (filter.status === Status.Completed) {
        return todo.completed;
      }

      if (filter.status === Status.Active) {
        return !todo.completed;
      }

      return todo;
    });
  }

  return filteredTodos;
};

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const filteredTodos = filterTodos(todos, filter);

  const setCurrentTodo = (todo: Todo) => {
    dispatch(currentTodoAction.setTodo(todo));
  };

  return (
    <>
      {filteredTodos.length === 0 && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {filteredTodos.length !== 0 && (
        <table className="table is-narrow is-fullwidth">
          <thead>
            <tr>
              <th>#</th>

              <th>
                <span className="icon">
                  <i className="fas fa-check" />
                </span>
              </th>

              <th>Title</th>
              <th> </th>
            </tr>
          </thead>

          <tbody>
            {filteredTodos.map((todo, i) => (
              <tr
                data-cy="todo"
                key={todo.id}
                className={currentTodo?.id === todo.id ? 'has-background-info-light' : ''}
              >
                <td className="is-vcentered">{i + 1}</td>
                <td className="is-vcentered">{todo.completed && <span className="icon" data-cy="iconCompleted"><i className="fas fa-check" /></span>}</td>

                <td className="is-vcentered is-expanded">
                  <p className={todo.completed ? 'has-text-success' : 'has-text-danger'}>{todo.title}</p>
                </td>

                <td className="has-text-right is-vcentered">
                  {!currentTodo ? (
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => setCurrentTodo(todo)}
                      aria-label="open todos detailes"
                    >
                      <span className="icon">
                        <i className="far fa-eye" />
                      </span>
                    </button>
                  ) : (
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      disabled
                      aria-label="this this todo is selected"
                    >
                      <span className="icon">
                        <i className="far fa-eye-slash" />
                      </span>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
