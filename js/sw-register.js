if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("service-worker.js")
      .then( () => {
        // console.log("Success register ServiceWorker");
      })
      .catch( () => {
        alert("Failed to register ServiceWorker");
      });
  });
} else {
  alert("ServiceWorker not supported in this browser.");
}