import { Button, Dialog, DialogActions, TextField } from "@mui/material";

// this component's props type
type Props = {
  text: string,
  filter: Filter,
  dialogOpen:boolean,
  onSubmit: () => void,
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  onToggleDialog:()=>void
}
export const FormDialog = (props:Props) => {
  return (
  <div>
    <Dialog fullWidth open={props.dialogOpen} onClose={props.onToggleDialog}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.onSubmit();
        }}
      >
        <div style={{ margin: '1em' }}>
          <TextField
            variant="standard"
            style={{
              width: '100%',
              fontSize: '16px',
              fontFamily:
                '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
            }}
            label="タスクを入力..."
            onChange={(e) => props.onChange(e)}
            value={props.text}
            autoFocus
          />
          <DialogActions>
            <Button color="secondary" onClick={props.onSubmit}>
              追加
            </Button>
          </DialogActions>
        </div>
      </form>
      </Dialog>
      </div>

  )

  
}