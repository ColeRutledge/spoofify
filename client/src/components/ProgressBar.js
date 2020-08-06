import React, { useContext, useEffect, useState } from 'react';
import { Slider } from '@material-ui/core'
import UserContext from '../context/UserContext';



const ProgressBar = () => {
    const { currentTime, setCurrentTime, isPlaying } = useContext(UserContext);

    const audio = document.getElementById('song');
    const slider = document.querySelector('.MuiSlider-track');
    const thumb = document.querySelector('.MuiSlider-thumb')

    const [myInterval, setMyInterval] = useState();
    const [step, setStep] = useState(1);

    const seekTime = () => {
        audio.currentTime = thumb.getAttribute('aria-valuenow') / step
        setCurrentTime(audio.currentTime)
    }

    useEffect(() => {
        if (audio) {
            setStep(100 / audio.duration)
        }
        let interval;
        if (!isPlaying) {
            clearInterval(myInterval)
        }
        if (audio && isPlaying) {
            interval = setInterval(() => {
                setCurrentTime(audio.currentTime)
                slider.style.width = `${(audio.currentTime / audio.duration) * 100}%`
                thumb.setAttribute('aria-valuenow', (audio.currentTime / audio.duration) * 100)
                thumb.style.left = `${(audio.currentTime / audio.duration) * 100}%`
                if (!isPlaying) {
                    clearInterval()
                }
            }, 1000);
            setMyInterval(interval)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPlaying])

    const secondsToMinutes = (seconds) => {
        const min = Math.floor(seconds / 60)
        const sec = Number.parseInt(seconds % 60)
        if (sec <= 9) {
            return `${min}:0${sec}`
        } else {
            return `${min}:${sec}`
        }
    }

    return (
        <div style={{ color: '#b3b3b3', display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <p style={{ marginRight: '15px', fontSize: '12px' }}>{secondsToMinutes(currentTime)}</p>
            <Slider onMouseUp={seekTime} step={step} style={{ color: 'grey', width: '350px', marginBottom: '2px' }}></Slider>
            <p style={{ marginLeft: '15px', fontSize: '12px' }}>{audio ? secondsToMinutes(audio.duration) : '0:00'}</p>
        </div >
    )
}

export default ProgressBar;
