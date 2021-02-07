import './App.css';
import { useState } from 'react-dom';
import RoomShow from './Containers/RoomShow';
import { Route, Redirect } from 'react-router-dom'

function App(props) {

  const [state, setState] = useState({
    currentUser: null,
    allRooms: [],
    currentRoom: {
      room: {},
      users: [],
      messages: []
    }
  })

  const getRoomData = (id) => {
    fetch(`http://localhost:3000/rooms/${id}`)
    .then(res => res.json())
    .then(result => {
      setState({
        currentRoom: {
          room: result.data,
          users: result.data.attributes.users,
          messages: result.data.attributes.messages
        }
      })
    })
  }

  const updateAppStateRoom = (newRoom) => {
    setState({
      currentRoom: {
        room: newRoom.room.data,
        users: newRoom.users,
        messages: newRoom.messages
      }
    })
  }

  return (
    <div className="App">
      <Route exact path='/rooms/:id' render={ (props) => {
        return state.currentUser ?
        (<RoomShow
        {...props}
        cableApp={props.cableApp}
        updateApp={updateAppStateRoom}
        getRoomData={getRoomData}
        roomData={state.currentRoom}
        currentUser={state.currentUser}
        />
        ) : (
          <Redirect to='/rooms' />
        )
      }} />
    </div>
  );
}

export default App;
