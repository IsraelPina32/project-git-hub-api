import { eventsQuantiy } from "../variable.js";

const screen = {
  userProfile: document.querySelector(".profile-data"),
  renderUser(user) {
    this.userProfile.innerHTML = `<div class="info"><img src="${
      user.avatarURL
    } alt="Foto do perfil do usuario" />
                          <div class="data">
                                     <h1>${
                                       "Nome Do Dev: " + (user.name ? user.name :
                                       "não possuir nome cadrastado👿")
                                     }</h1>
                                     <p>${
                                       "Bio : " + (user.bio  ? user.bio :
                                       "não possuir bio cadrastado👿")
                                     }</p>

                                     <p>${
                                       "Login : " + (user.userName ? user.name :
                                       "não possuir username cadrastado👿")
                                     }</p>
                                     <p>${
                                       "Seguidores : " + (user.followers ? user.followers :
                                       "não possuir está seguindos em nenhum perfil cadrastado👿")
                                     }</p>
                                     <p>${
                                       "Seguindo : " + (user.following ? user.following :
                                       "não pussir seguidores cadrastados👿")
                                     }
                              </div>       
                            </div>`;

    let repositoriesItens = "";

    let eventsItens = "";

    

    user.repositories.forEach(
      (repo) =>
        (repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a>
          <p>Forks: ${repo.forks_count ? repo.forks_count : "não possuir nenhum forks cadrastado👿" }</p>
          <p>Estrelas: ${repo.stargazers_count ? repo.stargazers_count : "não possuir nenhum estrelas cadrastado👿"}</p>
          <p>Watchers: ${repo.watchers_count ? repo.watchers_count : "não possuir nenhum watchers cadrastado👿"}</p>
          <p>Linguagem usada: ${repo.language ? repo.language : "não possuir nenhuma linguagem cadrastado👿"}</p></li>`)
    );

    if (user.repositories.length > 0) {
      this.userProfile.innerHTML += ` <div class="repositories section">
                <h2>Repositórios</h2>
              <ul>${repositoriesItens}</ul>
              </div>`;
    }
    const eventsCreateAndPush = user.events
      .filter(
        (event) => event.type === "PushEvent" || event.type === "CreateEvent"
      )
      .slice(0, eventsQuantiy);
    
    eventsCreateAndPush.forEach(
      (event) =>
        (eventsItens += `<li><p href="${event.repo.url}" target="_blank">${event.repo.name} - ${event.payload.commits ? event.payload.commits[0].message : "Sem mensagem" }</p></li>`)
    );
    if (user.events.length > 0) {
      this.userProfile.innerHTML += `<div class="events section"
                                      <h1>Eventos dos Ultimos Commits do Usuário.</h1>
                                      <ul>${eventsItens}</ul>
                                      </div>`;
      return;
    }

    this.userProfile.innerHTML += `<div class="events section"
                                      <h1>Eventos dos Ultimos Commits do Usuário.</h1>
                                      <p>Este Usuário não possuir eventos.</p>
                                      </div>`;
  },
  renderNotFound() {
    this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>";
  },
};

export { screen };
