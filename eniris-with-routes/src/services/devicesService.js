import localforage from "localforage";
import axios from "axios"

const URL = "http://localhost:3000"

//Check if data exists in localForage, fetch data from API if there is no data in localForage
export async function getDevices() {
    const devices = await localforage.getItem("devices");
    if (!devices) {
        const response = await fetchData();
        if (response.success) {
            await localforage.setItem("devices", response.data);
            return response.data;
        } else {
            throw new Error(response.message);
        }
    }
    return devices;
}

  //Trigger on FormSubmit and change the isInstalled property for the device with the given Id
  export async function updateDevices(deviceId) {
    const devices = await getDevices()
    const update = await localforage.setItem("devices", devices.map((device) =>
        device.id === parseInt(deviceId)
          ? {
              ...device,
              properties: {
                ...device.properties,
                isInstaller: !device.properties.isInstaller,
              },
            }
          : device,
      ))
    return update
  }

  //Fetch data from local Express server
  const fetchData = async () => {
    try {
      //Get loginToken
      const response = await axios.post(`${URL}/login`);
      if (response.status!==200) {
        throw new Error();
      }
      //Get accesToken with valid loginToken
      const response2 = await axios.get(`${URL}/accesstoken`, {
        headers: {
          Authorization: `Bearer ${response.data}`,
        },
      });
      if (response2.status!==200) {
        throw new Error();
      }
      //Get devices with valid accesToken
      const response3 = await axios.get(`${URL}/devices`, {
        headers: {
          Authorization: `Bearer ${response2.data}`,
        },
      });
      if (response3.status!==200) {
        throw new Error();
      }
      console.log(response3)
      return {success:true,data:response3.data.device}
    } catch (error) {
      return {success:false,data:[],message:error.message}
    }
  };