import { useState } from "react";

// Todoオブジェクトの型定義
type Todo = {
	value: string,
	readonly id: number,
	checked: boolean,
	removed: boolean;
};

type Filter = 'all' | 'checked' | 'unchecked' | 'removed';

export const App = () => {
	// 各hndle関数の共通処理を型定義する
	// =>todo型のオブジェクトを受け取り、その中の特定のプロパティを指定した値に更新する処理

	// const handleTodo:('Todo型オブジェクト', '書き換えたいプロパティ', '更新したい値') => void;

	// TはTodo型、UはTodoの各Key、VはT型にKey:Uを指定したValueとして<>内で変数のように定義
	// ()内の引数で使用
	const handleTodo = <T extends Todo, U extends keyof Todo, V extends T[U]>(
		obj: T,
		key: U,
		value: V) => {
			const deepCopy = todos.map((todo) => ({ ...todo }));

			const newTodos = deepCopy.map((todo) => {
				if (todo.id === obj.id) {
					todo[key] = value;
				}
				return todo;
			});
		
			setTodos(newTodos);
		}
	

	// [value, action] = useState('initValue')
	const [text, setText] = useState('');

	const [todos, setTodos] = useState<Todo[]>([{
		value: 'HELLO',
		id: 11,
		checked: false,
		removed: false
	}]);

	const [filter, setFilter] = useState<Filter>('all');

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
	// handleTodoに統一
	// const handleCheck = (id: number, checked:boolean) => {
	// 	const deepCopy = todos.map((todo) => ({ ...todo }));

	// 	const newTodos = deepCopy.map((todo) => {
	// 		if (todo.id === id ) {
	// 			todo.checked = !checked;
	// 		}
	// 		return todo;
	// 	})

	// 	setTodos(newTodos);
	// }

	// handleTodoに統一
	// const handleDelete = (id: number,  removed:boolean) => {
	// 	const deepCopy = todos.map((todo) => ({ ...todo }));

	// 	const newTodos = deepCopy.map((todo) => {
	// 		if (todo.id === id) {
	// 			todo.removed = !removed;
	// 		}
	// 		return todo;
	// 	})

	// 	setTodos(newTodos);
	// }

	const filteredTodos = todos.filter((todo) => {
		switch (filter) {
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

	const handleFilter = (filter:Filter) => {
		setFilter(filter);
	}


	const handleEmpty = () => {
		// ネストへの変更ではなく、オブジェクトそのものを削除するため、ディープコピーは不要
		const newTodos = todos.filter((todo) => !todo.removed);
		setTodos(newTodos);
	}

	return (
		<div>
			<select defaultValue="all" onChange={(e) => handleFilter(e.target.value as Filter)}>
        <option value="all">すべてのタスク</option>
        <option value="checked">完了したタスク</option>
        <option value="unchecked">現在のタスク</option>
        <option value="removed">ごみ箱</option>
			</select>
			{filter === 'removed' ? (
				<button onClick={() => handleEmpty()}>ゴミ箱を空にする</button>
			) : ( 
					// 上記かつfilter !== checkedならば
					filter !== 'checked' && (
						<form onSubmit={(e) => {
							e.preventDefault();
							handleSubmit();
						}}>
							<input
								type="text"
								value={text}
								// disabled={filter === 'checked' || filter === 'removed'}
								onChange={(e) => handleChange(e)}
							/>
							<input
								type="submit"
								value="追加"
								// disabled={filter === 'checked' || filter === 'removed'}
								onSubmit={handleSubmit}
							/>
						</form>
					)
			)}

		<ul>
				{filteredTodos.map((todo) => {
					return (
						<li key={todo.id}>
							<input
								type="checkbox"
								checked={todo.checked}
								disabled={todo.removed}
								onChange={() => handleTodo(
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
									handleEdit(todo.id, e.target.value)
								}}
							/>
							<button onClick={() => handleTodo(todo, 'removed', !todo.removed)}>
								{todo.removed ? '復元' : '削除'}
							</button>
						</li>
					)
				})}
				
		</ul>
		</div>
	);
};

