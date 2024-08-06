import { getUser } from "/src/js/services/user.js";
import { getRepositories } from "/src/js/services/repositories.js";
import { user } from "/src/js/objects/user.js";
import { screen } from "/src/js/objects/screen.js";
import { getEvents  } from "/src/js/services/events.js";

document.getElementById("btn-search").addEventListener("click", () => {
  const userName = document.getElementById("input-search").value;
  if (validateEmptyInput(userName)) return
  getUserData(userName);
});


document.getElementById("input-search").addEventListener("keyup", (e) => {
  const userName = e.target.value;
  const key = e.which || e.keyCode;
  const isEnterKeyPressed = key === 13;

  if (isEnterKeyPressed) {
    validateEmptyInput(userName)
    getUserData(userName);
  }
});

function validateEmptyInput(userName){
      if (userName.length === 0) {
            alert("Preencha o campo o nome do usuario do GitHub");
            return true;
          }
}

async function getUserData(userName) {
  const userResponse = await getUser(userName);
  const userResponsitories = await getRepositories(userName);
  const userEvents = await getEvents(userName);

  if(userResponse.message === "Not Found"){
      screen.renderNotFound();
      return
  }

  user.setInfo(userResponse);
  user.setRepositories(userResponsitories);
  user.setEvents(userEvents);
  // console.log(userResponsitories);
  screen.renderUser(user);
}
