import React from 'react'

class CreateRoom extends React.Component {
    render () {
        return (
            <div className="new-room-form">
                <form>
                    <input
                        type="text" 
                        placeholder="CreateRoom" 
                        required />
                    <button id="create-room-btn" type="submit">+</button>
            </form>
        </div>
        )
    }
}

export default CreateRoom;