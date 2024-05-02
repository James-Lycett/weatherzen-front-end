import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { listObservations } from "../utils/api"
import ErrorAlert from "../layout/ErrorAlert"

function Home() {
  const history = useHistory()
  const [observations, setObservations] = useState([])
  const [error, setError] = useState(null)

  // loads existing observations
  useEffect(() => {
    const abortController = new AbortController()
    listObservations(abortController.signal)
      .then(setObservations)
      .catch(setError)
    return () => abortController.abort()
  }, [])

  // navigates to edit observation page
  function editButtonHandler(observationId) {
    history.push(`/observations/edit/${observationId}`)
  }

  // observation table body
  const tableRows = observations.map((observation) => (
        <tr key={observation.observation_id}>
          <th scope="row">{observation.observation_id}</th>
          <td>{observation.latitude}</td>
          <td>{observation.longitude}</td>
          <td>{observation.sky_condition}</td>
          <td>{observation.air_temperature + observation.air_temperature_unit}</td>
          <td>{observation.created_at}</td>
          <td>
            <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={() => {editButtonHandler(observation.observation_id)}}
            >Edit
            </button>
          </td>
        </tr>
  ));

  if (observations.length > 0) {
    return (
      <main>
        <h1>Home</h1>
        <ErrorAlert error={error} />
        <div className="table-responsive">
        <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Latitude</th>
            <th scope="col">Longitude</th>
            <th scope="col">Sky Condition</th>
            <th scope="col">Air Temperature</th>
            <th scope="col">Created</th>
          </tr>
          </thead>
          <tbody>
          {tableRows}
          </tbody>
        </table>
        </div>
      </main>
    );
  } else {
    return (
      <p>The server spins down after a period of inactivity in order to save me money. If you don't see anything here give it a minute and reload the page.</p>
    )
  }
}

export default Home;
