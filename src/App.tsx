import { useState } from "react";
import { FormDialog } from './FormDialog'
import { ActionButton } from "./ActionButton";
import { SideBar } from "./SideBar";
import {TodoItem} from './TodoItem'

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

	// const handleEdit = (id: number, value: string) => {

	// 	//.map()は非破壊的ではないが、ネストしたプロパティはコピーされずの参照先は変わらない
	// 	//.map()で参照するプロパティに対する変更はオリジナルへのミューテート扱いとなる

	// 	// そのため.mapをスプレッドで展開しディープコピーする
	// 	const deepCopy = todos.map((todo) => ({ ...todo }));

	// 	const newTodos = deepCopy.map((todo) => {
	// 		if (todo.id === id) {
	// 			todo.value = value;
	// 		}
	// 		return todo;
	// 	})

	// 	// todos ステートが書き換えられていないかチェック
	// 	console.log('=== Original todos ===');
	// 	todos.map((todo) => console.log(`id: ${todo.id}, value: ${todo.value}`));

	// 	setTodos(newTodos);
	// }
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

	const handleFilter = (filter:Filter) => {
		setFilter(filter);
	}


	const handleEmpty = () => {
		// ネストへの変更ではなく、オブジェクトそのものを削除するため、ディープコピーは不要
		const newTodos = todos.filter((todo) => !todo.removed);
		setTodos(newTodos);
	}

	// 条件式 ? (A) : (B)  -> trueならA, falseならB 
	// 条件式 && (A)  -> trueならA, falseなら描画しない
	return (
		<div>
			<SideBar
				onSort={handleFilter}
			/>
				<ActionButton
					onEmpty={handleEmpty}
					todos={todos}
				/>
			<FormDialog
				text={text}
				onChange={handleChange}
				onSubmit={handleSubmit}
			/>
			<TodoItem
				todos={todos}
				filter={filter}
				onTodo={handleTodo}
			/>
				
		</div>
	);
};

