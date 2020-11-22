const base_url = "https://api.football-data.org/v2";
const api_key = 'd65bd9acab7247039bd9862ed5bec0d3';
let fetch_api = function(url) {    
  return fetch(url, {
    headers: {
      'X-Auth-Token': api_key
    }
  });
};


function status(response) {
  if (response.status !== 200) {
    return Promise.reject(new Error(response));
  } else {
    return Promise.resolve(response);
  }
}

function convertToJson(response) {
  return response.json();
}

function error(error) {
  console.log("Error : " + error);
}

function loadPreloader() {
  let statusPending = '';
  statusPending = `
    <div class="center">
      <div class="preloader-wrapper active">
        <div class="spinner-layer spinner-red-only">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div><div class="gap-patch">
            <div class="circle"></div>
          </div><div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
      </div>
    </div>
  `;
  document.getElementById("main-content").innerHTML = statusPending;
}

function responseGetKlasemen(data) {
  let stagesHTML = "";
  stagesHTML = `
    <div class="title-wrap">
      <h2 class="title">
        ${data.competition.area.name} ${data.competition.name}
      </h2>
    </div>
  `
  data.standings.forEach(function(stage) {
    stagesHTML += `
      <div class="stages">
        <p class="stage-type__name">${stage.type}</p>
        <div class="row">
    `
    stage.table.forEach(function(item) {
      stagesHTML += `
          <div class="col s12 m4">
            <div class="card card-team">
              <a href="./detail-team.html?id=${item.team.id}" class="card-team__link">
                <div class="row">
                  <div class="col s4">
                    <div class="card-image waves-effect waves-block waves-light">
                      <img
                        src="${item.team.crestUrl}"
                        alt="${item.team.name} icon"
                        class="card-team__img responsive-img"
                      />
                    </div>
                  </div>
                  <div class="col s8">
                    <div class="card-team__name">${item.team.name}</div>
                  </div>
                </div>
                <div class="row">
                  <div class="col s4">
                    <div class="card-team__number-text">
                      ${item.won}
                    </div>
                    <div class="card-team__tiny-text">
                      Won
                    </div>
                  </div>
                  <div class="col s4">
                    <div class="card-team__number-text">
                      ${item.draw}
                    </div>
                    <div class="card-team__tiny-text">
                      Draw
                    </div>
                  </div>
                  <div class="col s4">
                    <div class="card-team__number-text">
                      ${item.lost}
                    </div>
                    <div class="card-team__tiny-text">
                      Lost
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        `;
    });
    stagesHTML += `</div></div>`
  });
  document.getElementById("main-content").innerHTML = stagesHTML;
}

function responseGetDetailTeam(data) {
  let textHTML = ''
  textHTML += `
      <div class="card card-team">
        <div class="row">
          <div class="col s4">
            <div class="card-image waves-effect waves-block waves-light">
              <img
                src="${data.crestUrl}"
                alt="${data.name} icon"
                class="responsive-img"
              />
            </div>
          </div>
          <div class="col s8">
            <div class="card-team__name">${data.name}</div>
            <div class="card-team__address">${data.address}</div>
            <div class="card-team__website">${data.website}</div>
          </div>
        </div>
      </div>
    `;
  textHTML += `
    <div>Our Team</div>
    <div class="row">
  `
  data.squad.forEach(function(squad) {
    textHTML += `
      <div class="col s12 m3">
        <div class="card card-team">
          <div class="card-team__name">${squad.name}</div>
          <div class="card-team__position">${squad.position}</div>
          <div class="card-team__nationality">${squad.nationality}</div>
        </div>
      </div>
    `
  })
  textHTML += `
    </div>
  `
  document.getElementById("main-content").innerHTML = textHTML;
}

function getKlasemen() {
  loadPreloader();

  if ('caches' in window) {
    caches.match(base_url + "/competitions/2021/standings", {
        headers: {
          'X-Auth-Token': api_key
        }
      })
      .then((response) => {
        if (response) {
          convertToJson(response)
            .then(function(data) {
              responseGetKlasemen(data);
            })
        }
      })
  }

  fetch_api(base_url + "/competitions/2021/standings")
    .then(status)
    .then(convertToJson)
    .then(function(data) {
      responseGetKlasemen(data);
    })
    .catch(error);
}

function getDetailTeam() {
  loadPreloader();
  return new Promise(function(resolve, reject) {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");

    if ('caches' in window) {
      caches.match(base_url + "/teams/" + idParam, {
        headers: {
          'X-Auth-Token': api_key
        }
      })
      .then((response) => {
        if (response) {
          convertToJson(response)
          .then(function(data) {
            responseGetDetailTeam(data);
            resolve(data);
          });
        }
      })
    }

    fetch_api(base_url + "/teams/" + idParam)
      .then(status)
      .then(convertToJson)
      .then(function(data) {
        responseGetDetailTeam(data);
        resolve(data);
      });
  })
}

function getSavedTeamById() {
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = parseInt(urlParams.get("id"));
  
  getById(idParam).then(function(data) {
    let textHTML = ''
    textHTML += `
      <div class="card card-team">
        <div class="row">
          <div class="col s4">
            <div class="card-image waves-effect waves-block waves-light">
              <img
                src="${data.crestUrl}"
                alt="${data.name} icon"
                class="responsive-img"
              />
            </div>
          </div>
          <div class="col s8">
            <div class="card-team__name">${data.name}</div>
            <div class="card-team__address">${data.address}</div>
            <div class="card-team__website">${data.website}</div>
          </div>
        </div>
      </div>
    `;
    textHTML += `
      <div>Our Team</div>
      <div class="row">
    `
    data.squad.forEach(function(squad) {
      textHTML += `
        <div class="col s12 m3">
          <div class="card card-team">
            <div class="card-team__name">${squad.name}</div>
            <div class="card-team__position">${squad.position}</div>
            <div class="card-team__nationality">${squad.nationality}</div>
          </div>
        </div>
      `
    })
    textHTML += `
      </div>
    `

    document.getElementById("main-content").innerHTML = textHTML;
  });
}

function getSavedTeams() {
  getAll().then(function(teams) {
    let teamsHTML = "";

    if(teams.length) {
      teams.forEach(function(team) {
        teamsHTML += `
          <div class="card card-team">
            <a href="./detail-team.html?id=${team.id}&saved=true" class="card-team__link">
              <div class="row">
                <div class="col s4">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img
                      src="${team.crestUrl}"
                      alt="${team.name} icon"
                      class="card-team__img responsive-img"
                    />
                  </div>
                </div>
                <div class="col s8">
                  <div class="card-team__name">${team.name}</div>
                </div>
              </div>
            </a>
            <button
              data-id="${team.id}"
              class="btn-floating waves-effect waves-light btn discard"
              onclick="clicked(this)"
            >
              &#128148;
            </button>
          </div>
        `;
      });
    } else {
      teamsHTML = `
        <center>
          <p>No teams saved</p>
          <a class="waves-effect waves-light btn" href="./">Back to Home</a>
        </center>
      `
    }

    document.getElementById("main-content").innerHTML = teamsHTML;
  });
}

function deleteSavedTeam(id) {
  return new Promise(function(resolve, reject) {
    deleteItem(id).then(function(data) {
      resolve(data);
    });
  });
}