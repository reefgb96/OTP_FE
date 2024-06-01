import {useState, useEffect} from 'react';

const useCountdown = (initialMinutes: number) => {
    const [time, setTime] = useState(initialMinutes * 60);
    const [color, setColor] = useState<string>('white');
    
    useEffect(() => {
        const interval = setInterval(() => {
            setTime((prevTime) => {
                if (prevTime <= 0) {
                    clearInterval(interval);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
        
        return () => clearInterval(interval);
    }, []);
    
    useEffect(() => {
        if (time <= 60) {
            setColor(time % 2 === 0 ? 'red' : 'white');
        }
    }, [time]);
    
    return {
        minutes: Math.floor(time / 60),
        seconds: time % 60,
        color,
    };
};

export default useCountdown;
