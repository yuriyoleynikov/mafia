import React from 'react';
import logo from './logo.svg';
import './App.css';
import { observer } from 'mobx-react-lite'
import { createContext, useContext } from "react"
import { IPlayer, EState, Store } from './models/store';
import Button from '@mui/material/Button';

import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const StoreContext = createContext<Store | null>(null)

const StoreView = observer(() => {
  const myStore = useContext(StoreContext)
  return (
    <div>
      {myStore?.games[0].state === EState.initial ?
        <div>
          <Autocomplete
            multiple
            sx={{ width: 300 }}
            id="checkboxes-tags-demo"
            options={myStore?.users || []}
            disableCloseOnSelect
            getOptionLabel={(option) => option.name}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {'id: ' + option.id + ', ' + option.name}
              </li>
            )}
            onChange={(event, value) => {
              myStore?.games[0].addPlayers(value)
            }}
            getOptionDisabled={(option) =>
              myStore?.games[0].players.length == 10 &&
              !myStore?.games[0].players.find(e => e.id === option.id)
            }
            style={{ width: 500 }}
            renderInput={(params) => (
              <TextField {...params} label="Players" placeholder={myStore?.games[0].players.length.toString()} />
            )}
          />
          <div><Button
            disabled={myStore?.games[0].players.length !== 10}
            variant="contained" onClick={() => myStore?.games[0].start()}
            className='button'>start</Button></div>
        </div>
        : null}
      {myStore?.games[0].state === EState.initial ?
        <div>
          <TableContainer>
            {/* <TableContainer component={Paper}> */}
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Q</TableCell>
                  <TableCell>Id</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Seat</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {myStore?.games[0].players.map((player, index) => (
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={player.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{player.id}</TableCell>
                    <TableCell>{player.name}</TableCell>
                    <TableCell>{player.seat}</TableCell>
                  </TableRow>
                ))}
                {myStore?.games[0].freeSeats.map((freeSeats, index) => (
                  <TableRow key={freeSeats}>
                    <TableCell>{myStore?.games[0].players.length + index + 1}</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        : null}

      {/* {myStore?.games[0].state === EState.startAndGettingRole ?
        myStore?.games[0].players.filter((p: IPlayer) => p.seat === (myStore?.games[0].showRole + 1)).map((p: IPlayer) => <Button
          variant="contained" onClick={() => myStore?.games[0].showCurrentRole()}
          className='button'>{`Show role player number: ${myStore?.games[0].showRole + 1}`}</Button>)
        : null}

      {myStore?.games[0].state === EState.startAndGettingRole && myStore?.games[0].isShowed ?
        <div>{`Role player: ${myStore?.games[0].players[myStore?.games[0].showRole + 1].role}`}</div>
        : null}

      {myStore?.games[0].state === EState.startAndGettingRole ?
        <div><Button
          variant="contained" onClick={() => myStore?.games[0].showNextRole()}
          className='button'>Next</Button></div>
        : null}
      {/* {myStore?.games[0].state === State.start ?
        <div>
          <div>State.start</div>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Seat</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Role</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {myStore?.games[0].players.map((player) => (
                  <TableRow
                    key={player.id}
                  >
                    <TableCell>
                      {player.seat}
                    </TableCell>
                    <TableCell>{player.name}</TableCell>
                    <TableCell>{player.role}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        : null} */}

      {/* {myStore?.games[0].state === EState.startAndGettingRole ?
        myStore?.games[0].players.filter((p: IPlayer) => p.seat === (myStore?.games[0].showRole + 1)).map((p: IPlayer) => <Button
          variant="contained" onClick={() => myStore?.games[0].showCurrentRole()}
          className='button'>{`Show role player number: ${myStore?.games[0].showRole + 1}`}</Button>)
        : null}

      {myStore?.games[0].state === EState.startAndGettingRole && myStore?.games[0].isShowed ?
        <div>{`Role player: ${myStore?.games[0].players[myStore?.games[0].showRole + 1].role}`}</div>
        : null}

      {myStore?.games[0].state === EState.startAndGettingRole ?
        <div><Button
          variant="contained" onClick={() => myStore?.games[0].showNextRole()}
          className='button'>Next</Button></div>
        : null} */}
    </div>
  )
})

function App() {
  return (
    <StoreContext.Provider value={new Store()}>
      <StoreView />
    </StoreContext.Provider>
  );
}

export default App