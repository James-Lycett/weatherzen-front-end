import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import React, { useState, useEffect } from "react";
import { readObservation, updateObservation } from "../utils/api"; 
import ErrorAlert from "../layout/ErrorAlert";

function ObservationEdit() {
    const { id } = useParams()
    const history = useHistory()
    const [error, setError] = useState(null)

    // initializes to blank form until API data is recieved to autofill form fields
    const [observation, setObservation] = useState({ 
        latitude: "",
        longitude: "",
        sky_condition: "",
        air_temperature: "",
        air_temperature_unit: "",
    })

    // loads observation data from API
    useEffect(() => {
        async function getObservation() {
            const dbData = await readObservation(id)
            const { latitude, longitude, sky_condition, air_temperature, air_temperature_unit } = dbData
            const observationFromAPI = {
                latitude: latitude,
                longitude: longitude,
                sky_condition: sky_condition,
                air_temperature: air_temperature,
                air_temperature_unit: air_temperature_unit,
            }
            return observationFromAPI
        }
        getObservation()
        .then(setObservation)               
    }, [id])

    // returns to home page
    function cancelHandler() {
        history.push("/")
    }

    // updates state as user types
    function changeHandler({ target: { name, value }}) {
        setObservation((previousObservation) => ({
            ...previousObservation,
            [name]: value,
        }))
    }

    // sends updated observation to API then returns to home page
    function submitHandler(event) {
        event.preventDefault()
        updateObservation(id, observation)
        .then(() => {
            history.push("/")
        })
        .catch(setError)
    }

    
    return (
        <>
        <h1>Edit Observation</h1>
        <form onSubmit={submitHandler} className="mb-4">
        <ErrorAlert error={error} />
        <div className="row mb-3">
            <div className="col-6 form-group">
                <label className="form-label" htmlFor="latitude">
                    Latitude
                </label>
                <input
                    className="form-control"
                    id="latitude"
                    name="latitude"
                    type="number"
                    max="90"
                    min="-90"
                    value={observation.latitude}
                    onChange={changeHandler}
                    required={true}
                />
                <small className="form-text text-muted">Enter a value between -90 and 90.</small>
            </div>
            <div className="col-6">
                <label className="form-label" htmlFor="longitude">
                    Longitude
                </label>
                <input
                    className="form-control"
                    id="longitude"
                    name="longitude"
                    type="number"
                    max="180"
                    min="-180"
                    value={observation.longitude}
                    onChange={changeHandler}
                    required={true}
                />
                <small className="form-text text-muted">Enter a value between -180 and 180.</small>
            </div>
        </div>
        <div className="row mb-3">
            <div className="col-6">
                <label className="form-label" htmlFor="air_temperature">
                    Air Temperature
                </label>
                <input
                    className="form-control"
                    id="air_temperature"
                    name="air_temperature"
                    type="number"
                    max={(observation.air_temperature_unit === "F" ? "107" : "224")}
                    min={(observation.air_temperature_unit === "F" ? "-60" : "-50")}                    
                    value={observation.air_temperature}
                    onChange={changeHandler}
                    required={true}
                />
                <small className="form-text text-muted">
                    {observation.air_temperature_unit === "F" ? "Enter a value between -60 and 224." : "Enter a value between -50 and 107."}
                </small>
            </div>
            <div className="col-6">
                <label className="form-label" htmlFor="air_temperature_unit">
                    Air Temperature Unit
                </label>
                <select
                className="form-control"
                id="air_temperature_unit"
                name="air_temperature_unit"
                value={observation.air_temperature_unit}
                onChange={changeHandler}
                required={true}
            >
                <option value="F">Fahrenheit</option>
                <option value="C">Celsius</option>
                </select>
                <small className="form-text text-muted">Select temperature unit.</small>
            </div>
        </div>
        <div className="mb-3">
            <label className="form-label" htmlFor="cloudCover">
                Sky conditions
            </label>
            <select
                className="form-control"
                id="sky_condition"
                name="sky_condition"
                value={observation.sky_condition}
                onChange={changeHandler}
                required={true}
            >
                <option value="">Select a sky condition option</option>
                <option value="100">Cloudless</option>
                <option value="101">Some clouds</option>
                <option value="102">Cloud covered</option>
                <option value="103">Foggy</option>
                <option value="104">Raining</option>
                <option value="106">Snowing</option>
                <option value="108">Hailing</option>
                <option value="109">Thunderstorms</option>
            </select>
        </div>
        <div>
            <button
                type="button"
                className="btn btn-secondary mr-2"
                onClick={cancelHandler}
            >
                Cancel
            </button>
            <button
                type="submit"
                className="btn btn-primary"
            >
                Submit
            </button>
        </div>
    </form>
        </>
    )
    
}

export default ObservationEdit