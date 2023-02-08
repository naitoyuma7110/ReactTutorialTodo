// this component's props type
type Props = {
  text: string,
  onSubmit: () => void,
  onChange: (e: React.ChangeEvent<HTMLInputElement>)=> void
}
export const FormDialog = (props:Props) => {
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      // handleSubmit();
      props.onSubmit()
    }}>
      <input
        type="text"
        value={props.text}
        // disabled={filter === 'checked' || filter === 'removed'}
        // onChange={(e) => handleChange(e)}
        onChange={(e)=> props.onChange(e)}
      />
      <input
        type="submit"
        value="追加"
        // disabled={filter === 'checked' || filter === 'removed'}
        // onSubmit={handleSubmit}
        onSubmit={props.onSubmit}
      />
    </form>
  )

  
}