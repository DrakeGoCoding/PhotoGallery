function displayGallery(imgList, imgsPerRow) {
    let stringHtml = '';
    for (let i = 0; i < imgList.length; i += imgsPerRow) {
        // Append a new row per "imgsPerRow"
        stringHtml += `<div class="row">`;
        for (let j = i; j < imgList.length && j < i + imgsPerRow; j++) {
            // Append a maximum of "imgsPerRow" images per row
            stringHtml += `
                <div class="column image">
                    <img src="${imgList[j]}" alt="img">
                </div>`;
        }
        stringHtml += `</div>`;
    }
    container.innerHTML = stringHtml;
}

function openImageWindow(imgPosition){
    // Get image by position in array
    let image = images[imgPosition];
    currentImagePosition = imgPosition;

    // Create a specific image window for image details
    let imageWindow = document.createElement('div');
    container.appendChild(imageWindow);
    imageWindow.setAttribute('class', 'img-window');
    imageWindow.onclick = () => closeImageWindow();

    // Previous button
    let prevBtn = document.createElement('a');
    prevBtn.innerHTML += `<i class="fas fa-chevron-left"></i>`;
    prevBtn.onclick = () => changeImgTo(PREV_IMG);
    imageWindow.appendChild(prevBtn);

    // Image details
    let dipFigure = document.createElement('figure');
    dipFigure.setAttribute('id', 'current-figure');
    dipFigure.innerHTML = `
        <img src=${image.src}>
        <figcaption>
            Source: <a class="img-src" href="${image.src}" target="_blank">Lorem Picsum</a> <br>
            Size: ${image.naturalWidth} x ${image.naturalHeight} pixel
        </figcaption>
    `
    imageWindow.appendChild(dipFigure);

    // Next Button
    let nextBtn = document.createElement('a');
    nextBtn.innerHTML += `<i class="fas fa-chevron-right"></i>`;
    nextBtn.onclick = () => changeImgTo(NEXT_IMG);
    imageWindow.appendChild(nextBtn);
}

function closeImageWindow() {
    document.querySelector('.img-window').remove();
}

function changeImgTo(position) {
    let newFigurePosition;

    if (position === NEXT_IMG) {
        newFigurePosition = currentImagePosition + 1;
        if (newFigurePosition > images.length - 1) newFigurePosition = 0;
    }
    else if (position === PREV_IMG) {
        newFigurePosition = currentImagePosition - 1;
        if (newFigurePosition < 0) newFigurePosition = images.length - 1;
    }

    openImageWindow(newFigurePosition);
    currentImagePosition = newFigurePosition;
}

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

let imgList = [
    `https://picsum.photos/id/867/700`, `https://picsum.photos/id/649/700`, `https://picsum.photos/id/933/700`, `https://picsum.photos/id/356/700`,
    `https://picsum.photos/id/888/700`, `https://picsum.photos/id/44/700`, `https://picsum.photos/id/608/700`, `https://picsum.photos/id/685/700`,
    `https://picsum.photos/id/482/700`, `https://picsum.photos/id/702/700`, `https://picsum.photos/id/736/700`, `https://picsum.photos/id/273/700`,
    `https://picsum.photos/id/77/700`, `https://picsum.photos/id/457/700`, `https://picsum.photos/id/201/700`, `https://picsum.photos/id/832/700`,
    `https://picsum.photos/id/192/700`, `https://picsum.photos/id/955/700`, `https://picsum.photos/id/67/700`, `https://picsum.photos/id/439/700`,
    `https://picsum.photos/id/289/700`, `https://picsum.photos/id/313/700`, `https://picsum.photos/id/743/700`, `https://picsum.photos/id/696/700`,
    `https://picsum.photos/id/190/700`, `https://picsum.photos/id/551/700`, `https://picsum.photos/id/988/700`, `https://picsum.photos/id/727/700`,
    `https://picsum.photos/id/272/700`, `https://picsum.photos/id/598/700`, `https://picsum.photos/id/860/700`, `https://picsum.photos/id/445/700`
]

const IMGS_PER_ROW = 3;
const NEXT_IMG = true;
const PREV_IMG = false;

let container = document.getElementById('container');
displayGallery(imgList, IMGS_PER_ROW);

let images = document.getElementsByTagName('img');
let currentImagePosition;
for (let i = 0; i < images.length; i++) {
    let image = images[i];
    image.onclick = () => openImageWindow(i);
}

