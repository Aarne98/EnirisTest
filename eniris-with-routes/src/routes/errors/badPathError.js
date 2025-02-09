import { useRouteError,Link } from "react-router-dom"

export default function ErrorPageBadPath() {
  const error = useRouteError()

  return (
    <div className="App">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <Link to="/">Go back to home screen</Link><br></br>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  )
}