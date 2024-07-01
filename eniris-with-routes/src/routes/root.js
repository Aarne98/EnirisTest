import { useNavigation, Outlet, useLocation, NavLink } from "react-router-dom"

export default function Root() {
  const navigation = useNavigation()
  const location = useLocation()
  const denyLoadControl = !location.pathname.includes("/edit-devices")

  return (
    <div className="App">
      <h1>Device Manager</h1>
      <ul>
        <li>
          <NavLink
            to="/devices"
            className={({ isActive  }) =>
              isActive ? "link-active" : ""
            }
          >
            Go to list
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/edit-devices"
            className={({ isActive }) =>
              isActive ? "link-active" : ""
            }
          >
            Go to control
          </NavLink>
        </li>
      </ul>
      {/* Blocks loading... on edit-device to stop showing loading.... for a second when updating a device. */}
      {navigation.state === "loading" && denyLoadControl ? (
        <h3>Loading.....</h3>
      ) : (
        <Outlet />
      )}
    </div>
  )
}
