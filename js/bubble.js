function addBubble(location, xDelay, yDelay) {
    const bubble = `<div class="bubble bubble-animation-y" style="animation-delay: ${yDelay}s;"></div>`;
    const container = `<div class="bubble-container anim bubble-animation-x" style="left: ${location}%; animation-delay: ${xDelay}s;">${bubble}</div>`;
    document.body.insertAdjacentHTML("beforeend", container);
}

addBubble(95, 1.3, 0.7);
addBubble(10, 2, 2.1);
addBubble(75, 4.7, 3.8);
addBubble(95, 0, 6);
addBubble(40, 1.5, 7);
