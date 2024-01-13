document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.querySelector('.start-button');
    const resetButton = document.querySelector('.reset-button');
    const circles = document.querySelectorAll('.circle');
    const carImages = document.querySelectorAll('.car-img');
    const finishLine = document.querySelector('.finish-line');

    let gameStarted = false;
    startButton.addEventListener('click', function () {
        if (!gameStarted) {
            resetGame();

            gameStarted = true;

            addCircleClass(circles[0], 'red');
            setTimeout(function () {
                addCircleClass(circles[1], 'yellow');
            }, 1000);
            setTimeout(function () {
                addCircleClass(circles[2], 'green');

                moveCarRandomSpeed(carImages[0], finishLine.offsetLeft);
                moveCarRandomSpeed(carImages[1], finishLine.offsetLeft);
            }, 2000);
        }
    });

    resetButton.addEventListener('click', function () {
        resetGame();
    });


    function addCircleClass(circle, className) {
        circle.classList.add(className);
    }

    function removeCircleClass(circle, className) {
        circle.classList.remove(className);
    }

    function moveCarRandomSpeed(car, finishLinePosition) {
        const animationDuration = 4 + Math.random() * 6;
        car.style.animation = `moveCarAnimation ${animationDuration}s linear infinite`;
        car.style.animationPlayState = 'running';

        const keyframes = `@keyframes moveCarAnimation {
            0% {
                transform: translateX(0);
            }
            100% {
                transform: translateX(${finishLinePosition - car.offsetLeft}px);
            }
        }`;

        const styleElement = document.createElement('style');
        styleElement.innerHTML = keyframes;
        document.head.appendChild(styleElement);
    }

    function resetGame() {
        gameStarted = false;
        carImages.forEach(car => car.style.animation = 'none');
    }
});
