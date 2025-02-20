document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    let painting = false;

    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.62;

    let history = [];
    
    // Setze die Zeichenfarbe und -breite
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";

    function loadCanvas() {
        const savedImage = localStorage.getItem("canvasData");
        if (savedImage) {
            const img = new Image();
            img.src = savedImage;
            img.onload = () => ctx.drawImage(img, 0, 0);
        }
    }

    window.onload = loadCanvas;

    function saveState() {
        history.push(canvas.toDataURL());
    }

    function startPosition(e) {
        saveState();
        painting = true;
        draw(e);
    }

    function endPosition() {
        painting = false;
        ctx.beginPath();
    }

    function draw(e) {
        if (!painting) return;
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        let x, y;

        if (e.touches) {
            x = e.touches[0].clientX - rect.left;
            y = e.touches[0].clientY - rect.top;
        } else {
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
        }

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }

    // Event-Listener für Maus
    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", endPosition);
    canvas.addEventListener("mousemove", draw);

    // Event-Listener für Touch
    canvas.addEventListener("touchstart", startPosition);
    canvas.addEventListener("touchend", endPosition);
    canvas.addEventListener("touchmove", draw);

    // Funktion zum Löschen des Canvas
    document.getElementById("clearCanvas").addEventListener("click", function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        history = [];
    });

    // Funktion zum Rückgängigmachen der letzten Änderung
    document.getElementById("undoCanvas").addEventListener("click", function () {
        if (history.length > 0) {
            let img = new Image();
            img.src = history.pop();
            img.onload = function () {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);
            };
        }
    });

    document.getElementById("stroke").addEventListener('change', e => {
        ctx.strokeStyle = e.target.value;
    });

    function saveCanvas() {
        localStorage.setItem("canvasData", canvas.toDataURL());
    }
});