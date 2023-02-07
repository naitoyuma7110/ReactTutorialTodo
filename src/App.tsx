import { useState } from "react";

// Todoオブジェクトの型定義
type Todo = {
	value: string,
	readonly id: number
};

export const App = () => {

	// [value, action] = useState('initValue')
	const [text, setText] = useState('');

	const [todos, setTodos] = useState<Todo[]>([]);

	const handleSubmit = () => {
		if (!text) return
		
		const newTodo: Todo = {
			value: text,
			id: new Date().getTime()
		}

		// 値の更新で破壊的な処理を行わない
		setTodos([newTodo, ...todos]);
		setText("");
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value);
	};
	
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
					return <li>{todo.value}</li>
				})}
		</ul>
		</div>
	);
};

