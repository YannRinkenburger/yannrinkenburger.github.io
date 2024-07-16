function openData()
{
    document.getElementById("data").style.display = ""
    document.getElementById("imageView").style.display = "none"
    document.getElementById("home").style.display = "none"
}

function openHome()
{
    if(image !== "")
    {
        document.getElementById("openImageViewButton").style.display = ""
    }else{
        document.getElementById("openImageViewButton").style.display = "none"
    }

    document.getElementById("data").style.display = "none"
    document.getElementById("imageView").style.display = "none"
    document.getElementById("home").style.display = ""
}

if (!('BarcodeDetector' in window)) {
	console.log('no BarcodeDetector support');
} else {
	const barcodeDetector = new BarcodeDetector({
		formats: ['qr_code'],
	});
	let interval = undefined;
	let found = false;
	const line = document.querySelector('.line');
	const videoPreview = document.querySelector('#video-preview');

	navigator.mediaDevices
		.getUserMedia({ video: true })
		.then(async (videoStream) => {
			videoPreview.srcObject = videoStream;
		});

	videoPreview.addEventListener('loadeddata', startScanning);

	function startScanning() {
		clearInterval(interval);
		interval = setInterval(scan, 500);
	}

	async function scan() {
		if (!found) {
			line.classList.add('animate');
			console.log('scanning...');
			const barcodes = await barcodeDetector.detect(videoPreview);
			if (barcodes.length > 0) {
				console.log(barcodes[0].rawValue);
                document.getElementById("testText").innerHTML = barcodes[0].rawValue
				found = true;
			}
		} else {
			line.classList.remove('animate');
			clearInterval(interval);
		}
	}
}