// モジュールとカラーのインポート
import { styled } from '@mui/material/styles';
import { indigo, lightBlue, pink } from '@mui/material/colors';

// カスタマイズする MUI モジュールをインポート
import Avatar from '@mui/material/Avatar';
import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Icon } from '@mui/material'

import pjson  from '../../package.json';
import { useState } from 'react';

// ドロワー内リストの幅をカスタマイズ
const DrawerList = styled('div')(() => ({
  width: 250,
}));

// ドロワーヘッダーのサイズ・色などをカスタマイズ
const DrawerHeader = styled('div')(() => ({
  height: 150,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1em',
  backgroundColor: indigo[500],
  color: '#ffffff',
  fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
}));

// ヘッダー内に表示するアバターのカスタマイズ
const DrawerAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: pink[500],
  width: theme.spacing(6),
  height: theme.spacing(6),
}));

// this props
type Props = {
  // Filter型(文字列)を引数に持つ
  onSort: (filter: Filter) => void,
  drawerOpen:boolean,
  onToggleDrawer:()=> void
}


export const SideBar = (props: Props) => {
  
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };

  return (
    <Drawer
      variant="temporary"
      open={props.drawerOpen}
      onClose={props.onToggleDrawer}>
      <DrawerList
        role="presentation"
        onClick={props.onToggleDrawer}>
        <DrawerHeader>
          <DrawerAvatar>
              <Icon>create</Icon>
          </DrawerAvatar>
          <p>TODO v{pjson.version}</p>
        </DrawerHeader>
        <List component="nav" aria-label="main mailbox folders">
        <ListItem disablePadding>
            <ListItemButton
              selected={selectedIndex === 0}
              onClick={(e) => {
                props.onSort('all')
                handleListItemClick(e, 0)
              }}>
              <ListItemIcon>
                <Icon>subject</Icon>
              </ListItemIcon>
              <ListItemText secondary="すべてのタスク" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              selected={selectedIndex === 1}
              onClick={(e) => {
                props.onSort('checked')
                handleListItemClick(e, 1)
              }}>
              <ListItemIcon>
                <Icon sx={{ color: pink.A200 }}>
                  check_circle_outline
                </Icon>
              </ListItemIcon>
              <ListItemText secondary="完了したタスク" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              selected={selectedIndex === 2}
              onClick={(e) => {
                props.onSort('unchecked')
                handleListItemClick(e, 2)
              }}>
              <ListItemIcon>
                <Icon sx={{ color: lightBlue[500] }}>
                  radio_button_unchecked
                </Icon>
              </ListItemIcon>
              <ListItemText secondary="現在のタスク" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              selected={selectedIndex === 3}
              onClick={(e) => {
                props.onSort('removed')
                handleListItemClick(e, 3)
              }}>
              <ListItemIcon>
                <Icon>delete</Icon>
              </ListItemIcon>
              <ListItemText secondary="ゴミ箱" />
            </ListItemButton>
          </ListItem>
      </List>
      </DrawerList>
    </Drawer>
  )
} 

{/* <select defaultValue="all" onChange={(e) => props.onSort(e.target.value as Filter)}>
  <option value="all">すべてのタスク</option>
  <option value="checked">完了したタスク</option>
  <option value="unchecked">現在のタスク</option>
  <option value="removed">ごみ箱</option>
</select> */}