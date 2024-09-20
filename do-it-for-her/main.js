const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = true;
ctx.imageSmoothingQuality = "high";
const wrapper = document.getElementById("canvas-container");
const devicePixelRatio = window.devicePixelRatio || 1;
const height = wrapper.scrollHeight * devicePixelRatio;
const width = height * 1.8;
ctx.scale(devicePixelRatio, devicePixelRatio);

const imagePlaces = [
    {
        top: height * 0.21,
        left: width * 0.23,
        width: width * 0.046,
        height: height * 0.124,
        zIndex: 1,
    },
    {
        top: height * 0.16,
        left: width * 0.294,
        width: width * 0.043,
        height: height * 0.1,
        zIndex: 1,
    },
    {
        top: height * 0.1,
        left: width * 0.67,
        width: width * 0.16,
        height: height * 0.25,
        zIndex: 2,
    },
    {
        top: height * 0.12,
        left: width * 0.8,
        width: width * 0.19,
        height: height * 0.47,
        zIndex: 1,
    },
    {
        top: height * 0.45,
        left: width * 0.11,
        width: width * 0.27,
        height: height * 0.38,
        zIndex: 2,
    },
    {
        top: height * 0.44,
        left: width * 0.36,
        width: width * 0.15,
        height: height * 0.18,
        zIndex: 1,
    },
    {
        top: height * 0.59,
        left: width * 0.38,
        width: width * 0.41,
        height: height * 0.35,
        zIndex: 3,
    },
];

const background = new Image();
background.src = "./dont-forget-youre-here-forever-cropped.svg";
const drawBackground = () => {
    ctx.drawImage(background, 0, 0, width, height);
};

function checkOrientation() {
    if (window.innerHeight > window.innerWidth) {
        // Portrait orientation
        document.getElementById("landscape-prompt").style.display = "flex";
    } else {
        // Landscape orientation
        document.getElementById("landscape-prompt").style.display = "none";
    }
}

// Check on initial load
checkOrientation();

background.onload = () => {
    canvas.width = width;
    canvas.height = height;
    drawBackground();
    document.querySelectorAll("input").forEach((input, i) => {
        input.addEventListener("change", () => {
            const url = URL.createObjectURL(input.files[0]);
            resizeableImage(
                url,
                imagePlaces[i],
                "input" + (i + 1),
                width,
                height,
            );
        });
    });
};

document.getElementById("download-button").addEventListener("click", () => {
    renderImage();
    var link = document.getElementById("download");
    link.setAttribute("download", "do-it-for-her.jpg");
    link.setAttribute(
        "href",
        canvas
            .toDataURL("image/jpeg", 1)
            .replace("image/jpeg", "image/octet-stream"),
    );
    link.click();
});

const renderImage = () => {
    const elements = document.getElementsByClassName("resize-container");
    const canvasRect = ctx.canvas.getBoundingClientRect();
    const canvasOffsetX = window.scrollX + canvasRect.left;
    const canvasOffsetY = window.scrollY + canvasRect.top;

    Array.from(elements).forEach(function (element) {
        var img = element.querySelector("img");
        if (img) {
            const draw = function () {
                const parentWidth = Number(element.style.width.replace("px", ""));
                const parentHeight = Number(element.style.height.replace("px", ""));

                const rect = element.getBoundingClientRect();
                const x = (window.scrollX + rect.left - canvasOffsetX) * devicePixelRatio;
                const y = (window.scrollY + rect.top - canvasOffsetY) * devicePixelRatio;

                const scaleX = parentWidth / img.naturalWidth;
                const scaleY = parentHeight / img.naturalHeight;
                const scaleFactor = Math.max(scaleX, scaleY);

                const scaledWidth = img.naturalWidth * scaleFactor;
                const scaledHeight = img.naturalHeight * scaleFactor;

                const visibleWidth = Math.min(scaledWidth, parentWidth);
                const visibleHeight = Math.min(scaledHeight, parentHeight);

                const offsetX = (scaledWidth - parentWidth) / 2;
                const offsetY = (scaledHeight - parentHeight) / 2;

                // Calculate source rectangle
                const sx = offsetX / scaleFactor;
                const sy = offsetY / scaleFactor;
                const sWidth = visibleWidth / scaleFactor;
                const sHeight = visibleHeight / scaleFactor;

                // Calculate destination rectangle
                const dx = x;
                const dy = y;
                const dWidth = visibleWidth * devicePixelRatio;
                const dHeight = visibleHeight * devicePixelRatio;

                // Radius for rounded corners (adjust as needed)
                const radius = 5 * devicePixelRatio;

                drawRoundedImage(
                    ctx, 
                    img, 
                    sx, sy, sWidth, sHeight,
                    dx, dy, dWidth, dHeight,
                    radius
                );
            };

            if (img.complete) {
                draw();
            } else {
                img.onload = draw;
            }
        }
    });
};

// draws images with rounded corners
function drawRoundedImage(ctx, img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight, radius) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(dx + radius, dy);
    ctx.lineTo(dx + dWidth - radius, dy);
    ctx.quadraticCurveTo(dx + dWidth, dy, dx + dWidth, dy + radius);
    ctx.lineTo(dx + dWidth, dy + dHeight - radius);
    ctx.quadraticCurveTo(dx + dWidth, dy + dHeight, dx + dWidth - radius, dy + dHeight);
    ctx.lineTo(dx + radius, dy + dHeight);
    ctx.quadraticCurveTo(dx, dy + dHeight, dx, dy + dHeight - radius);
    ctx.lineTo(dx, dy + radius);
    ctx.quadraticCurveTo(dx, dy, dx + radius, dy);
    ctx.closePath();
    ctx.clip();
    
    ctx.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    
    ctx.restore();
}

const resizeableImage = (url, imagePlace, imageTargetElement) => {
    const img = new Image();
    const container = document.createElement("div");
    container.classList.add("resize-container");

    let firstLoad = true;
    let origAspectRatio;
    container.appendChild(img);
    img.src = url;
    document.getElementById(imageTargetElement).append(container);
    container.style.zIndex = imagePlace.zIndex + imagePlaces.length;
    const eventState = {};

    container.append(img);

    // append resize handle
    const resizeHandle = document.createElement("span");
    resizeHandle.classList.add("resize-handle");
    resizeHandle.textContent = "↘";
    container.prepend(resizeHandle);
    ["mousedown", "touchstart"].forEach((eventName) => {
        container.addEventListener(eventName, (e) => {
            if (e.target.matches(".resize-handle")) {
                startResize(e);
            }
        });
    });
    // append close button
    const closeHandle = document.createElement("span");
    closeHandle.classList.add("close-handle");
    container.prepend(closeHandle);
    container.addEventListener("mousedown", (e) => {
        document.removeChild;
        if (e.target.matches(".close-handle")) {
            container.remove();
        }
    });
    img.onload = () => {
        if (firstLoad) {
            origAspectRatio = img.width / img.height;
            if (img.width > imagePlace.width) {
                img.width = imagePlace.width / devicePixelRatio;
                img.height = img.width / origAspectRatio;
            }
            container.style.width = img.width + "px";
            container.style.height = img.height + "px";
        }
        firstLoad = false;
    };

    const saveEventState = (e) => {
        // Save the initial event details and container state
        eventState.containerWidth = container.offsetWidth;
        eventState.containerHeight = container.offsetHeight;
        const rect = container.getBoundingClientRect();
        eventState.containerLeft = rect.left;
        eventState.containerTop = rect.top;
        eventState.mouseX =
            (e.clientX || e.pageX || e.touches[0].clientX) + window.scrollX;
        eventState.mouseY =
            (e.clientY || e.pageY || e.touches[0].clientY) + window.scrollY;
        // Save the initial container position
        eventState.startLeft = parseInt(container.style.left, 10) || 0;
        eventState.startTop = parseInt(container.style.top, 10) || 0;
        eventState.evnt = e;
    };

    const startResize = (e) => {
        e.preventDefault();
        e.stopPropagation();
        saveEventState(e);
        document.addEventListener("mousemove", resizing);
        document.addEventListener("mouseup", endResize);

        document.addEventListener("touchmove", resizing);
        document.addEventListener("touchend", endResize);
    };

    const endResize = (e) => {
        e.preventDefault();
        document.removeEventListener("mouseup", endResize);
        document.removeEventListener("mousemove", resizing);

        document.removeEventListener("touchend", endResize);
        document.removeEventListener("touchmove", resizing);
        drawBackground();
    };

    const resizing = (e) => {
        const mouse = {};
        // calculate current position
        mouse.x =
            (e.clientX || e.pageX || e.touches[0].clientX) + window.scrollX;
        mouse.y =
            (e.clientY || e.pageY || e.touches[0].clientY) + window.scrollY;

        const originalWidth = eventState.containerWidth;
        const originalHeight = eventState.containerHeight;

        // Calculate deltas based on mouse movement
        const widthDelta = mouse.x - eventState.mouseX;
        const heightDelta = mouse.y - eventState.mouseY;

        // Choose to adjust based on width or height depending on the use case
        // Here, we adjust based on width delta as an example
        let newWidth = originalWidth + widthDelta;
        let newHeight = originalHeight + heightDelta;

        container.style.width = newWidth + "px";
        container.style.height = newHeight + "px";
    };

    const startMoving = (e) => {
        e.preventDefault();
        e.stopPropagation();
        saveEventState(e);
        document.addEventListener("mousemove", moving);
        document.addEventListener("mouseup", endMoving);

        document.addEventListener("touchmove", moving);
        document.addEventListener("touchend", endMoving);
    };
    img.addEventListener("mousedown", startMoving);
    img.addEventListener("touchstart", startMoving);

    const endMoving = (e) => {
        e.preventDefault();
        document.removeEventListener("mouseup", endMoving);
        document.removeEventListener("mousemove", moving);

        document.removeEventListener("touchend", endMoving);
        document.removeEventListener("touchmove", moving);
        drawBackground();
    };

    const moving = (e) => {
        const mouse = {};
        e.preventDefault();
        e.stopPropagation();
        // calculate current position
        mouse.x =
            (e.clientX || e.pageX || e.touches[0].clientX) + window.scrollX;
        mouse.y =
            (e.clientY || e.pageY || e.touches[0].clientY) + window.scrollY;

        // Calculate the difference from the initial mouse position
        const dx = mouse.x - eventState.mouseX;
        const dy = mouse.y - eventState.mouseY;

        // Update container's position based on the initial position plus the difference
        container.style.left = `${eventState.startLeft + dx}px`;
        container.style.top = `${eventState.startTop + dy}px`;
    };
};
