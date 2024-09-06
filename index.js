// Just some constants to simplify time conversion
const SECONDMS = 1000;
const MINUTEMS = SECONDMS * 60;
const HOURMS = MINUTEMS * 60;
const DAYMS = HOURMS * 24;

// This function runs when the user click on "Run" button
function click() {
    // Grabbing UI elements and resetting them while also disabling input elements
    const totalSessions = document.getElementById("totalSessions");
    totalSessions.disabled = true;
    const runButton = document.getElementById("run");
    runButton.disabled = true;
    document.getElementById("sessions").textContent = totalSessions.value;
    const sessionsTried = document.getElementById("sessionsTried");
    sessionsTried.textContent = "";
    const highest = document.getElementById("highest");
    highest.textContent = "";
    const elapsedTime = document.getElementById("time");
    elapsedTime.textContent = "";
    // Grabbing the script with the main code from the HTML to turn it into a blob
    // A blob is basically a file-like object of immutable, raw data
    // This is a "trick" so Web Workers can be used without setting a local server
    // because Web Workers require files from the same domain, and local files are
    // not considered same domain for security reason, but since the blob is generate
    // by the code itself, it is considered from the same domain, allowing the Web
    // Worker to run
    const blob = new Blob([document.getElementById("worker").textContent], {type: "text/javascript"});
    // Creating the Web Worker using the blob
    // The Web Worker allows for heavy/intense code to run in a background thread
    // without freezing the Browser
    const worker = new Worker(window.URL.createObjectURL(blob));
    // Creating a function for when the Worker sends a message to this main thread
    worker.onmessage = e => {
        // The data received from the Worker in this case is always an array with
        // 4 elements, the first is either a 0 (not finished) or 1 (finished), the
        // second is the max number of ones rolled, the third is the current amount
        // of rolls done, and the final one is the start time so we can calculate
        // how much time has passed since the code started running
        sessionsTried.textContent = e.data[2];
        highest.textContent = e.data[1];
        // Calculating elapsed time
        let time = (Date.now() - e.data[3]);
        // Converting time to use shorter numbers
        let measure = "s";
        if(time >= DAYMS) {
            time /= DAYMS;
            measure = "d";
        } else if(time >= HOURMS) {
            time /= HOURMS;
            measure = "h";
        } else if(time >= MINUTEMS) {
            time /= MINUTEMS;
            measure = "m";
        } else {
            time /= SECONDMS;
        }
        elapsedTime.textContent = time.toFixed(2) + measure;
        // If the code finished running, enable inputs again so the user can
        // run the code again
        if(e.data[0] === 1) {
            totalSessions.disabled = false;
            runButton.disabled = false;
        }
    };
    // Sending a message to the Worker containing the max amount of rolls to run
    // starting, the Worker
    worker.postMessage([totalSessions.value]);
}

// Adding an event to when the page finishes loading
document.addEventListener("DOMContentLoaded", () => {
    // Attaching the click function to the button after the page finishes loading
    document.getElementById("run").addEventListener("click", click);
});