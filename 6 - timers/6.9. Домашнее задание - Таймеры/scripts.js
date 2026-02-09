document.addEventListener('DOMContentLoaded', function() {
    
    const monthsElement = document.getElementById('months');
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const nextYearElement = document.getElementById('nextYear');
    const progressPercentElement = document.getElementById('progressPercent');
    const progressFillElement = document.getElementById('progressFill');
    
    function updateTimer() {
        const now = new Date();
        
        const currentYear = now.getFullYear();
        let nextNewYear;
        
        if (now.getMonth() === 0 && now.getDate() < 2) {
            nextNewYear = new Date(currentYear, 0, 1);
            if (now.getDate() === 1) {
                nextNewYear = new Date(currentYear + 1, 0, 1);
            }
        } else {
            nextNewYear = new Date(currentYear + 1, 0, 1);
        }
        
        nextYearElement.textContent = nextNewYear.getFullYear();
        
        const diff = nextNewYear - now;
        
        if (diff <= 0) {
            monthsElement.textContent = '0';
            daysElement.textContent = '0';
            hoursElement.textContent = '0';
            minutesElement.textContent = '0';
            secondsElement.textContent = '0';
            
            progressPercentElement.textContent = '100';
            progressFillElement.style.width = '100%';
            
            document.querySelector('h1').textContent = 'С Новым годом! 🎉';
            
            return;
        }
        
        const totalSeconds = Math.floor(diff / 1000);
        
        const totalDays = totalSeconds / (24 * 60 * 60);
        const months = Math.floor(totalDays / 30.44);
        
        const days = Math.floor(totalDays % 30.44);
        
        const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
        const seconds = Math.floor(totalSeconds % 60);
        
        monthsElement.textContent = months;
        daysElement.textContent = days;
        hoursElement.textContent = hours;
        minutesElement.textContent = minutes;
        secondsElement.textContent = seconds;
        
        const startOfYear = new Date(currentYear, 0, 1);
        const endOfYear = new Date(currentYear + 1, 0, 1);
        const totalYearMs = endOfYear - startOfYear;
        const elapsedMs = now - startOfYear;
        const progress = Math.min(100, (elapsedMs / totalYearMs) * 100);
        
        const progressRounded = Math.round(progress * 10) / 10; 
        progressPercentElement.textContent = progressRounded;
        progressFillElement.style.width = `${progress}%`;
    }
    
    updateTimer();
    
    setInterval(updateTimer, 1000);
    
    const timeValues = document.querySelectorAll('.time-value');
    
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    setTimeout(() => {
        timeValues.forEach(value => {
            const finalValue = parseInt(value.textContent);
            if (finalValue > 0) {
                animateValue(value, 0, finalValue, 1000);
            }
        });
    }, 500);
    
    console.log('Таймер до Нового года запущен!');
    console.log('Таймер будет обновляться каждую секунду.');
});