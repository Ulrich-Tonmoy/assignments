const bulb = document.getElementById("bulb");

bulb.addEventListener("click", () => {
    bulb.classList.toggle("on");
    bulb.classList.toggle("off");
});
