let imgEle = null;
let activeEle = null;
let startX, startY, endX, endY = 0;

const handleTouchStart = (event) => {
    event.preventDefault();
    activeEle.classList.remove('none');
    activeEle.style.left = '0';
    activeEle.style.top = '0';
    activeEle.style.width = '0';
    activeEle.style.height = '0';


    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;

    // 이미지 엘리먼트의 위치를 얻어와서 상대적인 좌표로 변환
    const imgRect = imgEle.getBoundingClientRect();
    const imgX = imgRect.left;
    const imgY = imgRect.top;

    // 상대적인 좌표 계산
    const relativeStartX = startX - imgX;
    const relativeStartY = startY - imgY;

    // 범위를 지정하지 않고 터치만 했을 때를 방지
    endX = startX;
    endY = startY;

    activeEle.style.left = `${relativeStartX}px`;
    activeEle.style.top = `${relativeStartY}px`;
};

const handleTouchMove = (event) => {
    event.preventDefault();
    
    endX = event.touches[0].clientX;
    endY = event.touches[0].clientY;

    // 이미지 엘리먼트의 위치를 얻어와서 상대적인 좌표로 변환
    const imgRect = imgEle.getBoundingClientRect();
    const imgX = imgRect.left;
    const imgY = imgRect.top;

    // 상대적인 좌표 계산
    const relativeStartX = startX - imgX;
    const relativeStartY = startY - imgY;
    const relativeEndX = endX - imgX;
    const relativeEndY = endY - imgY;

    const rectWidth = Math.abs(relativeEndX - relativeStartX);
    const rectHeight = Math.abs(relativeEndY - relativeStartY);

    activeEle.style.left = Math.min(relativeStartX, relativeEndX) + 'px';
    activeEle.style.top = Math.min(relativeStartY, relativeEndY) + 'px';
    activeEle.style.width = rectWidth + 'px';
    activeEle.style.height = rectHeight + 'px';
};


const handleTouchEnd = (event) => {
    event.preventDefault();

    const imgRect = imgEle.getBoundingClientRect();
    const imgX = imgRect.left;
    const imgY = imgRect.top;

    const computedStartX = Math.abs(startX - imgEle.offsetLeft - imgX);
    const computedStartY = Math.abs(startY - imgEle.offsetTop - imgY);
    const computedEndX = Math.abs(endX - imgEle.offsetLeft - imgX);
    const computedEndY = Math.abs(endY - imgEle.offsetTop - imgY);

    const relativeStartX = Math.min(computedStartX, computedEndX);
    const relativeStartY = Math.min(computedStartY, computedEndY);
    const relativeEndX = Math.max(computedStartX, computedEndX);
    const relativeEndY = Math.max(computedStartY, computedEndY);

    sendCommand('setTracker', { relativeStartX, relativeStartY, relativeEndX, relativeEndY });
};

const sendCommand = (command, params={}) => {
    console.log({action: 'sendCommand', command: command, params: params});
    params['command'] = command;

    $.post("/api/command/", params).done((json) => {
        console.log({action: 'sendCommand', json: json});
    }, 'json');
};

const setSpeed = () => {
    let params = {
        speed: $("#slider-speed").val(),
    };

    sendCommand('speed', params);
};

$(document).on('pageinit', () => {
    $('#slider-speed').on("slidestop", setSpeed);

    imgEle = document.querySelector('#img');
    activeEle = document.querySelector('#active');

    imgEle.addEventListener('touchstart', handleTouchStart);
    imgEle.addEventListener('touchmove', handleTouchMove);
    imgEle.addEventListener('touchend', handleTouchEnd);
});