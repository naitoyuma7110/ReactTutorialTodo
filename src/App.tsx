import GlobalStyles from '@mui/material/GlobalStyles';
import { ToolBar } from "./global/ToolBar";

// スタイルエンジンのモジュールとカラーをインポート
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { indigo, pink } from '@mui/material/colors';
import { AlertDialog } from './components/AlertDialog';


import { useState } from "react";
import { FormDialog } from './components/FormDialog'
import { ActionButton } from "./components/ActionButton";
import { SideBar } from "./components/SideBar";
import { TodoItem } from './components/TodoItem'
import { QR } from './components/QR';

// テーマを作成
// <ThemeProvider>でラップすると使用可能
const theme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
      light: '#757de8',
      dark: '#002984',
    },
    secondary: {
      main: pink[500],
      light: '#ff6090',
      dark: '#b0003a',
    },
  },
});

export const App = () => {
	// slide menu
	const [drawerOpen, setDrawerOpen] = useState(false);
	const handleToggleDrawer = () => setDrawerOpen(!drawerOpen);

	// QR
	const [qrOpen, setQrOpen] = useState(false);
	const handleToggleQR = () => setQrOpen(!qrOpen);

	// daialog 
	const [dialogOpen, setDialogOpen] = useState(false);
	const handleToggleDialog = () => {
		setDialogOpen(!dialogOpen);
		// フォームへの入力をクリア
		setText('');
	};

	// delete dialog
	const [alertOpen, setAlertOpen] = useState(false);
	const handleToggleAlert = () => setAlertOpen(!alertOpen);



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

	const [todos, setTodos] = useState<Todo[]>([
		{
		value: 'HELLO',
		id: 11,
		checked: false,
		removed: false
		},
		{
			value: 'Checked',
			id: 12,
			checked: true,
			removed: false
		},
		{
			value: 'Unchecked',
			id: 1,
			checked: false,
			removed: false
			},
	]);

	const [filter, setFilter] = useState<Filter>('all');

	const handleSubmit = () => {
		if (!text) {
			setDialogOpen(false)
			return
		}
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
		setDialogOpen(false);
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setText(e.target.value);
	};
/*--以下3つの関数 
		handleEdit, 
		handleCheck, 
		handleDelete, 
		はhandleTodoに統一 --*/ 

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
		<ThemeProvider theme={theme}>
			<GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />
			<ToolBar
				filter={filter}
				drawerOpen={drawerOpen}
				onToggleDrawer={handleToggleDrawer}

			/>
			<SideBar
				onSort={handleFilter}
				drawerOpen={drawerOpen}
				onToggleDrawer={handleToggleDrawer}
				onToggleQR={handleToggleQR}
			/>
			<AlertDialog
        alertOpen={alertOpen}
        onToggleAlert={handleToggleAlert}
        onEmpty={handleEmpty}
      />
			<ActionButton
				todos={todos}
				filter={filter}
				alertOpen={alertOpen}
        dialogOpen={dialogOpen}
        onToggleAlert={handleToggleAlert}
        onToggleDialog={handleToggleDialog}
			/>
			<FormDialog
				text={text}
				dialogOpen={dialogOpen}
				onChange={handleChange}
				onSubmit={handleSubmit}
				filter={filter}
				onToggleDialog={handleToggleDialog}
			/>
			<TodoItem
				todos={todos}
				filter={filter}
				onTodo={handleTodo}
			/>
			<QR
				open={qrOpen}
				onClose={handleToggleQR}
			/>
		</ThemeProvider>
	);
};

