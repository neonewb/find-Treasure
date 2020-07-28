function getRandomNumber(size) {
    return Math.floor(Math.random() * size);
}

let target = {
    xCoord: 0,
    yCoord: 0
}

let clickCounter;

function startGame() {
    target.xCoord = getRandomNumber(400);
    target.yCoord = getRandomNumber(400);
    clickCounter = 0;
    $('#distance').text('');
    $('#clickCounter').text('');
    $('#reStart').hide(1);
}

startGame();

function createWave(event, color) {
    let wave = document.createElement('div');
    wave.style.top = (event.pageY - 25) + "px";
    wave.style.left = (event.pageX - 25) + "px";
    wave.style.backgroundColor  = color;
    wave.className = 'wave';
    setTimeout(function() {
      wave.classList.add("active");
    }, 0);
    wave.addEventListener("transitionend", function() {
      wave.remove();
    });
    document.body.appendChild(wave);
}

let cklickSound = document.getElementById('clickSound');
function cklickSoundPlay() {
    cklickSound.play();
}
function cklickSoundload() {
    cklickSound.load();
}

function onMapClick(event) {
    cklickSoundload();
    cklickSoundPlay();
    clickCounter++;
    $('#clickCounter').text('Количество кликов: ' + clickCounter);
    let sumDifference = Math.abs(target.xCoord - event.offsetX) + Math.abs(target.yCoord - event.offsetY);

    if (sumDifference > 700) {
        createWave(event, '#002947');
        $('#distance').text('Мороз');
        return;
    }
    if (sumDifference > 600) {
        createWave(event, '#002947');
        $('#distance').text('Очень холодно');
        return;
    }
    if (sumDifference > 500) {
        createWave(event, '#6BBCD1');
        $('#distance').text('Холодно');
        return;
    }
    if (sumDifference > 400) {
        createWave(event, 'white');
        $('#distance').text('Тепло');
        return;
    }
    if (sumDifference > 300) {
        createWave(event, 'white');
        $('#distance').text('Теплее');
        return;
    }
    if (sumDifference > 200) {
        createWave(event, 'rgb(255, 100, 100)');
        $('#distance').text('Горячо');
        return;
    }
    if (sumDifference > 100) {
        createWave(event, 'rgb(255, 50, 50)');
        $('#distance').text('Очень горячо');
        return;
    }
    if (sumDifference > 10) {
        createWave(event, 'rgb(255, 0, 0)');
        $('#distance').text('Пекло');
        return;
    }
    if (sumDifference <= 10) {
        createWave(event, 'rgb(255, 0, 234)');
        $('#distance').text('Нашёл! Поздравляю! :)');
        $('#reStart').show(1);
        return;
    }
}

$('#map').click(onMapClick);
$("#reStart").click(startGame);

$('#map').on('mousemove', function(e) {
    cursor.style.display = 'block';
    cursor.style.top = (e.pageY - 10) + "px";
    cursor.style.left = (e.pageX - 10) + "px";
});