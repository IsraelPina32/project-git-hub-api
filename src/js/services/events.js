import { baseURL} from "/src/js/variable.js";

async function getEvents(userName){
    const response = await fetch(`${baseURL}/${userName}/events`);
    return await response.json();
}

export { getEvents };