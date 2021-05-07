import React, { useContext, useEffect } from "react"
import { EventContext } from "./EventProvider.js"
import { useHistory } from "react-router-dom"
import "./Events.css"

export const EventList = () => {
    const history = useHistory()
    const { events, getEvents, joinEvent, leaveEvent } = useContext(EventContext)

    useEffect(() => {
        getEvents()
    }, [])

    return (
        <article className="events">
            <header className="events__header">
                <h1>Level Up Game Events</h1>
                <button className="btn btn-2 btn-sep icon-create"
                    onClick={() => {
                        history.push({ pathname: "/event/new" })
                    }}
                >Schedule New Event</button>
            </header>
            {
                events.map(event => {
                    return <section key={event.id} className="registration">
                        <div className="registration__game">Name of the Event: {event.game.name}</div>
                        <div>Number of Players: {event.game.number_of_players}</div>
                        <div>Description of the Event:{event.description}</div>
                        <div>Skill Level of Game: {event.game.skill_level}</div>
                        <div>Organizer: {event.organizer.user.first_name} {event.organizer.user.last_name}</div>
                        <div>
                            Event Date: {event.date} @ Time of event: {event.time}
                        </div>
                        {
                            event.joined
                                ? <button className="btn btn-3"
                                    onClick={() => leaveEvent(event.id)}
                                    >Leave</button>
                                : <button className="btn btn-2"
                                    onClick={() => joinEvent(event.id)}
                                    >Join</button>
                        }
                    </section>
                })
            }
        </article>
    )
}