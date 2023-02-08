type Props = {
  todos: Todo[],
  filter: Filter,
  // Parent Component's handleTodo(Inplement) -> onTodo(Type)
  onTodo:	<T extends Todo, U extends keyof Todo, V extends T[U]>(
		obj: T,
		key: U,
		value: V) => void
}

export const TodoItem = (props:Props) => {
  const filteredTodos = props.todos.filter((todo) => {
		switch (props.filter) {
			case 'all':
				return !todo.removed
			case 'checked':
				return todo.checked && !todo.removed
			case 'unchecked':
				return !todo.checked && !todo.removed
			case 'removed':
				return todo.removed
			default:
				return todo;
		}
	})


  return (
		<ul>
				{filteredTodos.map((todo) => {
					return (
						<li key={todo.id}>
							<input
								type="checkbox"
								checked={todo.checked}
								disabled={todo.removed}
								onChange={() => props.onTodo(
									todo,
									'checked',
									!todo.checked
								)}
							/>
							<input
								type="text"
								disabled={todo.checked || todo.removed}
								value={todo.value}
								onChange={(e) => {
									props.onTodo(todo,'value', e.target.value)
								}}
							/>
							<button onClick={() => props.onTodo(todo, 'removed', !todo.removed)}>
								{todo.removed ? '復元' : '削除'}
							</button>
						</li>
					)
				})}
		</ul>
  )
}