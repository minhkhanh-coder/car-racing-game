document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.querySelector('.start-btn');
    const resetButton = document.querySelector('.reset-btn');
    const circles = document.querySelectorAll('.circle');
    const carImages = document.querySelectorAll('.car-img');
    const finishLine = document.querySelector('.finish-line');

    let gameStarted = false;
    let winnerDeclared = false;

    startButton.addEventListener('click', function () {
        if (!gameStarted) {
            resetGame();
            winnerDeclared = false;

            gameStarted = true;

            addCircleClass(circles[0], 'circle-red');
            setTimeout(function () {
                addCircleClass(circles[1], 'circle-yellow');
            }, 1000);
            setTimeout(function () {
                addCircleClass(circles[2], 'circle-green');

                moveCarRandomSpeed(carImages[0], finishLine.offsetLeft, 1);
                moveCarRandomSpeed(carImages[1], finishLine.offsetLeft, 2);
            }, 2000);
        }
    });

    resetButton.addEventListener('click', function () {
        resetGame();
        winnerDeclared = false;

        circles.forEach(circle => removeCircleClass(circle, 'circle-red', 'circle-yellow', 'circle-green'));
    });

    function addCircleClass(circle, className) {
        circle.classList.add(className);
    }

    function removeCircleClass(circle, ...classNames) {
        circle.classList.remove(...classNames);
    }

    function moveCarRandomSpeed(car, finishLinePosition, carNumber) {
        const animationDuration = 4 + Math.random() * 6;
        car.style.animation = `moveCarAnimation${carNumber} ${animationDuration}s linear infinite`;
        car.style.animationPlayState = 'running';

        const keyframes = `@keyframes moveCarAnimation${carNumber} {
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

        car.addEventListener('animationiteration', function () {
            if (!winnerDeclared) {
                declareWinner(carNumber);
            }
        });
    }

    function declareWinner(carNumber) {
        winnerDeclared = true;
        alert(`Xe ${carNumber} chiến thắng! Tuyệt vời quá bạn ơiiiiiiii!`);
    }

    function resetGame() {
        gameStarted = false;
        carImages.forEach(car => {
            car.style.animation = 'shake 0.82s cubic-bezier(.36,.07,.19,.97) infinite';
        });
    }
});
