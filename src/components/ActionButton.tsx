import { Fab, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Icon from '@mui/material/Icon';

// this component's props type
type Props = {
  todos: Todo[],
  filter:Filter,
  alertOpen: boolean;
  dialogOpen: boolean;
  onToggleAlert: () => void;
  onToggleDialog: () => void;
}

const IconButton = styled(Button)({
  position: 'fixed',
  right: 15,
  bottom: 15,
});

export const ActionButton = (props: Props) => {
  const removed = props.todos.filter((todo) => todo.removed).length !== 0;
  return (
    <div>
      {props.filter === 'removed' ? (
        <IconButton
          variant="contained"
          endIcon={<Icon>delete</Icon>}
          color="secondary"
          onClick={props.onToggleAlert}
          disabled={!removed || props.alertOpen}
        >
          タスクの削除
        </IconButton>
      ) : (
          <IconButton
            variant="outlined"
            endIcon={<Icon>create</Icon>}
            color="primary"
            onClick={props.onToggleDialog}
            disabled={props.filter === 'checked' || props.dialogOpen}
          >
            タスクの追加
        </IconButton>
      )}
    </div>
  )
}