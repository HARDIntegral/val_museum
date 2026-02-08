const slides = [
	{ src: "/static/images/01.jpg", title: "Exhibit I",   text: "Aww look at this cutie <3" },
	{ src: "/static/images/02.jpg", title: "Exhibit II",  text: "Remember when we went to get khatti rolls before our movie cuddle time?" },
	{ src: "/static/images/03.jpg", title: "Exhibit III", text: "The smile OMG you should really be a model" },
	{ src: "/static/images/04.jpg", title: "Exhibit IV",  text: "Ooooo remember when we went out for our Rook&Pawn date?" },
	{ src: "/static/images/05.jpg", title: "Exhibit V",   text: "This picture will forever be cute" },
	{ src: "/static/images/06.jpg", title: "Exhibit VI",  text: "My cutie graduated" },
	{ src: "/static/images/07.jpg", title: "Exhibit VII", text: "Bad hair day hehehehe sassy <3" },
	{ src: "/static/images/08.jpg", title: "Exhibit VIII",text: "I remember you being so happy and excited for this lunch date before the big game" },
	{ src: "/static/images/09.jpg", title: "Exhibit IX",  text: "This is where it all began..." },
];

const app = document.getElementById("app");
const startArrow = document.getElementById("startArrow");
const nextArrow  = document.getElementById("nextArrow");
const toFinalBtn = document.getElementById("toFinalBtn");
const artImg   = document.getElementById("artImg");
const capTitle = document.getElementById("capTitle");
const capText  = document.getElementById("capText");
const counter  = document.getElementById("counter");
const yesBtn = document.getElementById("yesBtn");
const noBtn  = document.getElementById("noBtn");
let page = 0;
let idx  = 0;

function goToPage(p){
	page = p;
	if (app) app.style.transform = `translateX(-${page * 100}vw)`;
}

function loadSlide(i){
	if (!slides.length) {
	if (capTitle) capTitle.textContent = "No exhibits yet";
	if (capText) capText.textContent = "Add images to static/images and list them in app.js";
	if (counter) counter.textContent = "0 / 0";
	if (artImg) artImg.removeAttribute("src");
	return;
	}

	idx = Math.max(0, Math.min(slides.length - 1, i));
	const s = slides[idx];

	// fade in
	if (artImg) {
	artImg.style.opacity = "0";
	artImg.style.transition = "opacity 180ms ease";
	}

	const img = new Image();
	img.onload = () => {
		if (artImg) {
			artImg.src = s.src;
			artImg.style.opacity = "1";
		}
	};
	img.onerror = () => {
		if (artImg) {
			artImg.src = "";
			artImg.style.opacity = "1";
		}
		if (capTitle) capTitle.textContent = "Image not found";
		if (capText) capText.textContent = s.src + " (check filename/path)";
	};
	img.src = s.src;

	if (capTitle) capTitle.textContent = s.title ?? "";
	if (capText) capText.textContent  = s.text ?? "";
	if (counter) counter.textContent  = `${idx + 1} / ${slides.length}`;
}

startArrow?.addEventListener("click", () => {
	goToPage(1);
	loadSlide(0);
});

nextArrow?.addEventListener("click", () => {
	if (idx >= slides.length - 1) {
	goToPage(2);
	return;
	}
	loadSlide(idx + 1);
});

toFinalBtn?.addEventListener("click", () => {
	goToPage(3);
});

noBtn?.addEventListener("click", () => {
	noBtn.style.opacity = "0.5";

	if (yesBtn) {
	yesBtn.classList.remove("shake");
	void yesBtn.offsetWidth; 
	yesBtn.classList.add("shake");
	setTimeout(() => yesBtn.classList.remove("shake"), 600);
	}
});

yesBtn?.addEventListener("click", () => {
	confetti({
	particleCount: 120,
	spread: 80,
	origin: { y: 0.6 }
	});
});

goToPage(0);
loadSlide(0);