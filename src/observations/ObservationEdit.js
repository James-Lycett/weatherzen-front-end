import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import React, { useState, useEffect } from "react";
import { readObservation, updateObservation } from "../utils/api"; 
import ErrorAlert from "../layout/ErrorAlert";

function ObservationEdit() {
    const { id } = useParams()
    const history = useHistory()
    const [error, setError] = useState(null)

    const [observation, setObservation] = useState({ 
        latitude: "",
        longitude: "",
        sky_condition: "",
    })

    useEffect(() => {
        async function getObservation() {
            const dbData = await readObservation(id)
            const { latitude, longitude, sky_condition } = dbData
            const observationFromAPI = {
                latitude: latitude,
                longitude: longitude,
                sky_condition: sky_condition
            }
            return observationFromAPI
        }
        getObservation()
        .then(setObservation)               
    }, [id])

    function cancelHandler() {
        history.push("/")
    }

    function changeHandler({ target: { name, value }}) {
        setObservation((previousObservation) => ({
            ...previousObservation,
            [name]: value,
        }))
    }

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