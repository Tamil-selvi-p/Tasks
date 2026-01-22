function showDateAndTime() {
  const date = new Date();
  
  const hours = date.getHours() >12 ? date.getHours() - 12 : "0"+date.getHours();
  const minutes = date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes();
  const seconds = date.getSeconds() <10 ? "0"+date.getSeconds() : date.getSeconds();
  const AmPm = date.getHours() < 12 ? "AM" : "PM";

  // ensure element reference exists
  const dateAndTime = document.getElementById("dateAndTime");
  if (dateAndTime) {
      dateAndTime.innerHTML = date.getDate()+ "-" + (date.getMonth()+1) + "-" + date.getFullYear() + " "+ hours + ":" + minutes + ":" + seconds + " "+AmPm;
  }
};
setInterval(showDateAndTime, 1000);

//get geolocation
function getGeoLocation(callback) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
            const coords = `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`;
            if (typeof callback === 'function') callback(coords);
        },
        () => {
            alert("Unable to retrieve location.");
            if (typeof callback === 'function') callback('Unavailable');
        }
      );
    } else {
      alert("Geolocation not supported by this browser.");
      if (typeof callback === 'function') callback('Unsupported');
    }
}

//Check-in button - click
document.getElementById("chk-in-btn").addEventListener("click", () => {

    // Call getGeoLocation with a real callback (remove the invalid TypeScript-style annotation)
    getGeoLocation(function(coords) {
        const now = new Date();
        const dateStr = now.getDate() + "-" + (now.getMonth()+1) + "-" + now.getFullYear();
        // normalize to 12-hour, always a zero-padded string
        const hours = String((now.getHours() % 12) || 12).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');

        // Insert into table (assumes a <table> exists in the page)
        const table = document.getElementById('chk-in-table');
        if (table) {
            const target = table.tBodies && table.tBodies[0] ? table.tBodies[0] : table;
            target.insertAdjacentHTML('beforeend', `\n<tr>\n    <td>${dateStr}</td>\n    <td>${coords}</td>\n    <td>${hours}:${minutes}</td>\n</tr>`);
        }
    });
});

//Check-out button - click
document.getElementById("chk-out-btn").addEventListener("click", () => {

    // Call getGeoLocation with a real callback (remove the invalid TypeScript-style annotation)
    getGeoLocation(function(coords) {
        const now = new Date();
        const dateStr = now.getDate() + "-" + (now.getMonth()+1) + "-" + now.getFullYear();
        const hours = now.getHours() > 12 ? now.getHours() - 12 : String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');

        // Insert into table (assumes a <table> exists in the page)
        debugger
        const table = document.getElementById('chk-out-table');
        if (table) {
            table.insertAdjacentHTML('beforeend', 
                `<tr>
                    <td>${dateStr}</td>
                    <td>${coords}</td>
                    <td>${hours + ":" + minutes}</td>
                </tr>`
            );
        }
    });
});

