// this component's props type
type Props = {
  todos:Todo[],
  onEmpty: () => void,
}

export const ActionButton = (props:Props) => {
  return (
    <button
    // onClick={() => handleEmpty()}
      onClick={props.onEmpty}
      disabled={props.todos.filter((todo)=>todo.removed).length === 0}
    >
      ゴミ箱を空にする
    </button>
  )
}