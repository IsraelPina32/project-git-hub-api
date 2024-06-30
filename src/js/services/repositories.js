import { baseURL, repositoreQuantity } from "/src/js/variable.js";

async function getRepositories(userName) {
    const response = await fetch(`${baseURL}/${userName}/repos?per_page=${repositoreQuantity}`);
    return await response.json();
}
export { getRepositories }