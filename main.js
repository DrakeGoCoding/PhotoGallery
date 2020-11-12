function displayGallery(imgList) {
    let newRow;
    container.innerHTML = ``;
    for (let i = 0; i < imgList.length; i += IMGS_PER_ROW) {
        // Append a new row per "IMGS_PER_ROW"
        newRow = document.createElement('div');
        newRow.setAttribute('class', 'row');
        for (let j = i; j < imgList.length && j < i + IMGS_PER_ROW; j++) {
            // Append a maximum of "IMGS_PER_ROW" images per row
            let newImage = document.createElement('div');
            newImage.setAttribute('class', 'column image');
            newImage.innerHTML = `<img src="${imgList[j]}" alt="img">`
            newRow.appendChild(newImage);
        }
        container.appendChild(newRow);
    }

    let newImageBtn = document.createElement('div');
    newImageBtn.setAttribute('class', 'column new-img-btn');
    newImageBtn.innerHTML = `<i class="fas fa-plus"></i>`;
    newImageBtn.onclick = () => {
        imgList.push(newRandomImage());
        displayGallery(imgList, IMGS_PER_ROW);
    }

    if (imgList.length % IMGS_PER_ROW !== 0) newRow.appendChild(newImageBtn);
    else {
        newRow = document.createElement('div');
        newRow.setAttribute('class', 'row');
        newRow.appendChild(newImageBtn);
        container.appendChild(newRow);
    }

    updateImgList();
}

function newRandomImage() {
    while (true) {
        let newImage = generateImgList(1, 1000, IMG_SIZE)[0];
        if (!imgList.includes(newImage)) return newImage;
    }
}

// Keep track of current image's position in image list
let currentImagePosition;

function openImageWindow(imgPosition) {
    // Get image by position in array
    let image = images[imgPosition];
    currentImagePosition = imgPosition;

    // Create a specific image window for image details
    let imageWindow = document.createElement('div');
    imageWindow.setAttribute('class', 'img-window');
    imageWindow.onclick = () => closeImageWindow();
    container.appendChild(imageWindow);

    // Previous button
    let prevBtn = document.createElement('a');
    prevBtn.setAttribute('class', 'fas fa-chevron-left prev-btn');
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
    nextBtn.setAttribute('class', 'fas fa-chevron-right next-btn');
    nextBtn.onclick = () => changeImgTo(NEXT_IMG);
    imageWindow.appendChild(nextBtn);
}

function updateImgList(){
    images = document.querySelectorAll('.column.image img');
    for (let i = 0; i < images.length; i++) {
        let image = images[i];
        image.onclick = () => openImageWindow(i);
    }
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

const IMGS_PER_ROW = 3;
const IMG_SIZE = 700;
const NEXT_IMG = true;
const PREV_IMG = false;

let imgList = [
    `https://picsum.photos/id/867/${IMG_SIZE}`, `https://picsum.photos/id/649/${IMG_SIZE}`, `https://picsum.photos/id/933/${IMG_SIZE}`, `https://picsum.photos/id/356/${IMG_SIZE}`,
    `https://picsum.photos/id/888/${IMG_SIZE}`, `https://picsum.photos/id/44/${IMG_SIZE}`, `https://picsum.photos/id/608/${IMG_SIZE}`, `https://picsum.photos/id/685/${IMG_SIZE}`,
    `https://picsum.photos/id/482/${IMG_SIZE}`, `https://picsum.photos/id/702/${IMG_SIZE}`, `https://picsum.photos/id/736/${IMG_SIZE}`, `https://picsum.photos/id/273/${IMG_SIZE}`,
]
let images;
let container = document.getElementById('container');
displayGallery(imgList);

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

function generateImgList(quantity, idRange, imgSize) {
    let requestImg = new XMLHttpRequest();
    let img, random;
    let imgList = [];
    if (!idRange) idRange = 1000;
    do {
        random = Math.floor(Math.random() * idRange);
        img = `https://picsum.photos/id/${random}/${imgSize}`;
        requestImg.open('GET', img, false);
        requestImg.send();
        if (requestImg.status === 200 && !imgList.includes(img)) imgList.push(img);
    } while (imgList.length !== quantity);
    return imgList;
}