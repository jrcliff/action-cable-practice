import React, { useEffect, useState } from 'react';
import RoomWebSocket from '../Components/RoomWebSocket'

export default function RoomShow(props) {



    return (
        <div>
            <RoomWebSocket 
            cableApp={props.cableApp}
            updateApp={props.updateApp}
            getRoomData={props.getRoomData}

            />
        </div>
    )
}
