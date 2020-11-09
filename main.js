function displayGallery(imgList, imgsPerRow) {
    let newRow;
    container.innerHTML = ``;
    for (let i = 0; i < imgList.length; i += imgsPerRow) {
        // Append a new row per "imgsPerRow"
        newRow = document.createElement('div');
        newRow.setAttribute('class', 'row');
        for (let j = i; j < imgList.length && j < i + imgsPerRow; j++) {
            // Append a maximum of "imgsPerRow" images per row
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
        imgList = addRandomImageTo(imgList);
        displayGallery(imgList, imgsPerRow);
    }

    if (imgList.length % imgsPerRow !== 0) newRow.appendChild(newImageBtn);
    else{
        newRow = document.createElement('div');
        newRow.setAttribute('class', 'row');
        newRow.appendChild(newImageBtn);
        container.appendChild(newRow);
    }
}

function addRandomImageTo(imgList){
    let newImage;
    while(true){
        newImage = generateImgList(1, 1000, 700)[0];
        if (!imgList.includes(newImage)) {
            imgList.push(newImage);
            return imgList;
        }
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
    // `https://picsum.photos/id/77/700`, `https://picsum.photos/id/457/700`, `https://picsum.photos/id/201/700`, `https://picsum.photos/id/832/700`,
    // `https://picsum.photos/id/192/700`, `https://picsum.photos/id/955/700`, `https://picsum.photos/id/67/700`, `https://picsum.photos/id/439/700`,
    // `https://picsum.photos/id/289/700`, `https://picsum.photos/id/313/700`, `https://picsum.photos/id/743/700`, `https://picsum.photos/id/696/700`,
    // `https://picsum.photos/id/190/700`, `https://picsum.photos/id/551/700`, `https://picsum.photos/id/988/700`, `https://picsum.photos/id/727/700`,
    // `https://picsum.photos/id/272/700`, `https://picsum.photos/id/598/700`, `https://picsum.photos/id/860/700`, `https://picsum.photos/id/445/700`,
    // `https://picsum.photos/id/476/700`, `https://picsum.photos/id/384/700`, `https://picsum.photos/id/638/700`, `https://picsum.photos/id/396/700`,
    // `https://picsum.photos/id/900/700`, `https://picsum.photos/id/842/700`, `https://picsum.photos/id/228/700`, `https://picsum.photos/id/407/700`,
    // `https://picsum.photos/id/938/700`, `https://picsum.photos/id/300/700`, `https://picsum.photos/id/478/700`, `https://picsum.photos/id/543/700`,
    // `https://picsum.photos/id/96/700`, `https://picsum.photos/id/232/700`, `https://picsum.photos/id/173/700`, `https://picsum.photos/id/170/700`,
    // `https://picsum.photos/id/726/700`, `https://picsum.photos/id/417/700`, `https://picsum.photos/id/700/700`, `https://picsum.photos/id/53/700`,
    // `https://picsum.photos/id/943/700`, `https://picsum.photos/id/811/700`, `https://picsum.photos/id/209/700`, `https://picsum.photos/id/870/700`,
    // `https://picsum.photos/id/580/700`, `https://picsum.photos/id/161/700`, `https://picsum.photos/id/227/700`, `https://picsum.photos/id/35/700`,
    // `https://picsum.photos/id/785/700`, `https://picsum.photos/id/61/700`, `https://picsum.photos/id/403/700`, `https://picsum.photos/id/849/700`,
    // `https://picsum.photos/id/316/700`, `https://picsum.photos/id/661/700`, `https://picsum.photos/id/922/700`, `https://picsum.photos/id/70/700`,
    // `https://picsum.photos/id/919/700`, `https://picsum.photos/id/378/700`, `https://picsum.photos/id/243/700`, `https://picsum.photos/id/369/700`,
    // `https://picsum.photos/id/923/700`, `https://picsum.photos/id/524/700`, `https://picsum.photos/id/970/700`, `https://picsum.photos/id/214/700`,
    // `https://picsum.photos/id/554/700`, `https://picsum.photos/id/320/700`, `https://picsum.photos/id/756/700`, `https://picsum.photos/id/552/700`,
    // `https://picsum.photos/id/137/700`, `https://picsum.photos/id/531/700`, `https://picsum.photos/id/863/700`, `https://picsum.photos/id/987/700`,
    // `https://picsum.photos/id/23/700`, `https://picsum.photos/id/168/700`, `https://picsum.photos/id/315/700`, `https://picsum.photos/id/903/700`,
    // `https://picsum.photos/id/770/700`, `https://picsum.photos/id/914/700`, `https://picsum.photos/id/431/700`, `https://picsum.photos/id/613/700`,
    // `https://picsum.photos/id/456/700`, `https://picsum.photos/id/237/700`, `https://picsum.photos/id/555/700`, `https://picsum.photos/id/129/700`,
    // `https://picsum.photos/id/568/700`, `https://picsum.photos/id/203/700`, `https://picsum.photos/id/887/700`, `https://picsum.photos/id/666/700`
]

const IMGS_PER_ROW = 3;
const NEXT_IMG = true;
const PREV_IMG = false;

let container = document.getElementById('container');
displayGallery(imgList, IMGS_PER_ROW);

let images = document.getElementsByTagName('img');
for (let i = 0; i < images.length; i++) {
    let image = images[i];
    image.onclick = () => openImageWindow(i);
}

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