import { Form, useLoaderData, redirect } from "react-router-dom"
import { getDevices, updateDevices } from "../services/devicesService"

export async function loader() {
  const devices = await getDevices()
  return { devices }
}
export async function action({ request }) {
  const formData = await request.formData()
  const deviceId = Object.fromEntries(formData).id
  console.log(deviceId)
  await updateDevices(deviceId)
  return redirect("/edit-devices")
}

export default function EditDevices() {
  const { devices } = useLoaderData()

  return (
    <div className="App">
      <h2>Device beheer</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Is Active</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device) => (
            <tr key={device.id}>
              <td>{device.properties.name}</td>
              <td>{device.properties.isInstaller ? "True" : "False"}</td>
              <td>
                <Form method="post" id={device.id}>
                  <input name="id" value={device.id} hidden readOnly />
                  <button type="submit">
                    {device.properties.isInstaller ? "Disable" : "Enable"}
                  </button>
                </Form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
