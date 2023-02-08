// 引数:arg, 返値:booleanをarg is Todoの構文で型定義する
// -> 返値trueであれば argはTodo型、 falseであればそうでない事を表す

// argがTodo型：返値true
// argがそれ以外：返値false 
const isTodo = (arg: any): arg is Todo => {
  return (
    typeof arg === 'object' &&
    typeof arg.id === 'number' &&
    typeof arg.value === 'string' &&
    typeof arg.checked === 'boolean' &&
    typeof arg.removed === 'boolean'
  );
};

// isTodoを利用した配列の型チェック
// arg is Todo[]は返値treuであれば、argはTodo[]型である事を表す
// arg.every(isTodo)はargの各プロパティをisTodoで検査し、結果が全てtrueならtrueを返す
export const isTodos = (arg: any): arg is Todo[] => {
  return Array.isArray(arg) && arg.every(isTodo);
};