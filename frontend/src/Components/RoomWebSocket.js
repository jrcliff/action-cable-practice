import React, { Component } from 'react'

export default class RoomWebSocket extends Component {

    componentDidMount() {
        this.props.getRoomData(window.location.href.match(/\d+$/)[0])

        this.props.cableApp.room = this.props.cableApp.cable.subscriptions.create({
            channel: 'RoomsChannel',
            room: window.location.href.match(/\d+$/)[0]
        },
        {
            received: (updatedRoom) => {
                this.props.updateApp(updatedRoom)
            }
        })
    }
    


    render() {
        return (
            <div>
                
            </div>
        )
    }
}
