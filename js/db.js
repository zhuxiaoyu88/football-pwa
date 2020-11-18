const dbPromised = idb.open("football", 1, function(upgradeDb) {
  const teamsObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id"
  });
  teamsObjectStore.createIndex("team_name", "team_name", { unique: false });
  teamsObjectStore.createIndex("team_name", "team_name", { unique: false });
});

function saveForLater(team) {
  dbPromised
    .then(function(db) {
      const tx = db.transaction("teams", "readwrite");
      let store = tx.objectStore("teams");
      console.log(team);
      store.add(team);
      return tx.complete;
    })
    .then(function() {
      M.toast({html: 'Team saved !'})
    });
}

function getAll() {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        const tx = db.transaction("teams", "readonly");
        const store = tx.objectStore("teams");
        return store.getAll();
      })
      .then(function(teams) {
        resolve(teams);
      });
  });
}

function getById(id) {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        const tx = db.transaction("teams", "readonly");
        const store = tx.objectStore("teams");
        return store.get(id);
      })
      .then(function(team) {
        resolve(team);
      });
  });
}

function deleteItem(id) {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        const tx = db.transaction('teams', 'readwrite');
        const store = tx.objectStore('teams');
        store.delete(id);
        return tx.complete;
      })
      .then(function() {
        resolve();
      });
  })
}