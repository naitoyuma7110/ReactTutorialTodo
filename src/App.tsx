import { useState } from "react";

// Todoオブジェクトの型定義
type Todo = {
	value: string,
	readonly id: number,
	checked: boolean,
	removed: boolean;
};

export const App = () => {

	// [value, action] = useState('initValue')
	const [text, setText] = useState('');

	const [todos, setTodos] = useState<Todo[]>([{
		value: 'HELLO',
		id: 11,
		checked: false,
		removed: false
	}]);

	const handleSubmit = () => {
		if (!text) return
		
		const newTodo: Todo = {
			value: text,
			id: new Date().getTime(),
			checked: false,
			removed: false
		}

		// 値の更新で破壊的な処理を行わない
		// スプレッドは非破壊的なディープコピー(ネストされた参照先も変更される)
		setTodos([newTodo, ...todos]);
		setText("");
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value);
	};

	const handleEdit = (id: number, value: string) => {

		//.map()は非破壊的ではないが、ネストしたプロパティはコピーされずの参照先は変わらない
		//.map()で参照するプロパティに対する変更はオリジナルへのミューテート扱いとなる

		// そのため.mapをスプレッドで展開しディープコピーする
		const deepCopy = todos.map((todo) => ({ ...todo }));

		const newTodos = deepCopy.map((todo) => {
			if (todo.id === id) {
				todo.value = value;
			}
			return todo;
		})

		// todos ステートが書き換えられていないかチェック
		console.log('=== Original todos ===');
		todos.map((todo) => console.log(`id: ${todo.id}, value: ${todo.value}`));

		setTodos(newTodos);
	}

	const handleCheck = (id: number, checked:boolean) => {
		const deepCopy = todos.map((todo) => ({ ...todo }));

		const newTodos = deepCopy.map((todo) => {
			if (todo.id === id ) {
				todo.checked = !checked;
			}
			return todo;
		})

		setTodos(newTodos);
	}

	const handleDelete = (id: number,  removed: boolean) => {
		const deepCopy = todos.map((todo) => ({ ...todo }));

		const newTodos = deepCopy.map((todo) => {
			if (todo.id === id) {
				todo.removed = !removed;
			}
			return todo;
		})

		setTodos(newTodos);
	}

	return (
		<div>
			<form onSubmit={(e) => {
				e.preventDefault();
				handleSubmit();
			}}>
				<input
					type="text"
					value={text}
					onChange={(e) => handleChange(e)}
				/>
				<input
					type="submit"
					value="追加"
					onSubmit={(e) => e.preventDefault()
					}
				/>
			</form>
		<ul>
				{todos.map((todo) => {
					return (
						<li key={todo.id}>
							<input
								type="checkbox"
								checked={todo.checked}
								disabled={todo.removed}
								onChange={() => handleCheck(
									todo.id,
									todo.checked
								)}
							/>
							<input
								type="text"
								disabled={todo.checked || todo.removed}
								value={todo.value}
								onChange={(e) => {
									handleEdit(todo.id, e.target.value)
								}}
							/>
							<button onClick={() => handleDelete(todo.id, todo.removed)}>
								{todo.removed ? '復元' : '削除'}
							</button>
						</li>
					)
				})}
				
		</ul>
		</div>
	);
};

