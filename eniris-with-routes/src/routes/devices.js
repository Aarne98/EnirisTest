import React from 'react';
import { useLoaderData } from "react-router-dom";
import { getDevices } from "../services/devicesService";

export async function loader() {
    const devices = await getDevices();
    return { devices };
}

export default function Devices() {
    const { devices } = useLoaderData();

    return (
        <div className="App">
            <h2>Device List</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Is Active</th>
                    </tr>
                </thead>
                <tbody>
                    {devices.map(device => (
                        <tr key={device.id}>
                            <td>{device.properties.nodeId}</td>
                            <td>{device.properties.name}</td>
                            <td>{device.properties.isInstaller ? 'True' : 'False'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}