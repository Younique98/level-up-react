import React, { useContext, useState, useEffect } from "react"
import { EventContext } from "./EventProvider.js"
import { useHistory } from 'react-router-dom'
import { GameContext } from "./GameProvider"

export const EventForm = (props) => {
    const history = useHistory()
    const { createEvent, joinEvent, leaveEvent, updateEvent, getEvents, events } = useContext(EventContext)
    const { games, getGames } = useContext(GameContext)
    const [ eventState, setEvent ] = useState({})
    /*
    Since the input fields are bound to the values of
    the properties of this state variable, you need to
    provide some default values.
    */
   const [currentEvent, setCurrentEvent] = useState({
       name: "",
       time: "",
       date: "",
       description: "",
       game: "",
       organizer: localStorage.getItem("lu_token")
       
    })
    console.log(props)
    const editMode = props.match.params.hasOwnProperty("eventId")

    const getEventInEditMode = () => {
        if (editMode) {
            const eventId = parseInt(props.match.params.eventId)
            const selectedEvent = events.find(e => e.id === eventId) || {}
            setEvent(selectedEvent)
        }
    }
    /*
        Get event types on initialization so that the <select>
        element presents event type choices to the user.
    */
    useEffect(() => {
        getEvents()
        getGames()
    }, [])

    useEffect(() => {
        getEventInEditMode()
    }, [events])
    /*
        REFACTOR CHALLENGE START

        Can you refactor this code so that all property
        state changes can be handled with a single function
        instead of five functions that all, largely, do
        the same thing?

        One hint: [event.target.name]
    */
    const changeEventNameState = (event) => {
        const newEventState = { ...currentEvent }
        newEventState.name = event.target.value
        setCurrentEvent(newEventState)
    }
    const changeEventTimeState = (event) => {
        const newEventState = { ...currentEvent }
        newEventState.time = event.target.value
        setCurrentEvent(newEventState)
    }

    const changeEventDateState = (event) => {
        debugger
        const newEventState = { ...currentEvent }
        newEventState.date = event.target.value
        // let myDate = newEventState.date;
        // myDate = myDate.split("-");
        // let newDate = new Date( myDate[2], myDate[1] - 1, myDate[0]);
        // let finalDateFormat = myDate
        // finalDateFormat = event.target.value
        setCurrentEvent(newEventState)
    }

    const changeEventDescriptionState = (event) => {
        const newEventState = { ...currentEvent }
        newEventState.description = event.target.value
        setCurrentEvent(newEventState)
    }

    const changeGameNameState = (event) => {
        const newGameState = { ...currentEvent }
        newGameState.game = event.target.value
        setCurrentEvent(newGameState)
    }




    const constructUpdateEvent = () => {
        const eventId = parseInt(currentEvent.eventId)

        if (eventId === 0) {
            window.alert("Please select an event")
        } else {
            if (editMode) {
                // PUT
                updateEvent({
                    id: eventState.id,
                    name: eventState.name,
                    time: eventState.time,
                    date: eventState.date,
                    description: eventState.description,
                    game: eventState.game,
                    organizer: localStorage.getItem("lu_token")
                })
                    .then(() => props.history.push("/events"))
            } 
        }
    }


    /* REFACTOR CHALLENGE END */

    return (
        <form className="eventForm">
            <h2 className="eventForm__name">Register New event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Event Name: </label>
                    <input type="name" name="name" required autoFocus className="form-control"
                        value={currentEvent.name}
                        onChange={changeEventNameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={changeEventTimeState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" id="eventDate" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventDateState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventDescriptionState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="game">What is the Game? </label>
                    <select name="game" className="form-control"
                        value={currentEvent.game}
                        onChange={changeGameNameState}>

                        <option value="0">Select a Game</option>
                        {games.map(gameName => (
                            <option key={gameName.id} value={gameName.id}>
                                {gameName.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            

            {/* You create the rest of the input fields for each event property */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()
debugger
                    const event = {
                        name: currentEvent.name,
                        time: currentEvent.time,
                        date: currentEvent.date,
                        description: currentEvent.description,
                        game: parseInt(currentEvent.game),
                        organizer: localStorage.getItem("lu_token")
                        
                    }
                    // Send POST request to your API
                    createEvent(event)
                        .then(() => history.push("/events"))
                }}
                className="btn btn-primary">Create</button>

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructUpdateEvent()
                }}
                className="btn btn-primary">
                {editMode ? "Save Updates" : "Edit Event"}
            </button>
        </form>
    )
}