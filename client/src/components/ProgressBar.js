import React, { useContext, useEffect } from 'react';
import { Slider } from '@material-ui/core'
import UserContext from '../context/UserContext';

const ProgressBar = () => {
    const audio = document.getElementById('song');
    const slider = document.querySelector('.MuiSlider-track');
    const thumb = document.querySelector('.MuiSlider-thumb')

    const { currentTime, setCurrentTime, isPlaying } = useContext(UserContext);

    useEffect(() => {
        if (audio && isPlaying) {
            setInterval(() => {
                setCurrentTime(secondsToMinutes(audio.currentTime))
                slider.style.width = `${(audio.currentTime / audio.duration) * 100}%`
                thumb.setAttribute('aria-valuenow', (audio.currentTime / audio.duration) * 100)
                thumb.style.left = `${(audio.currentTime / audio.duration) * 100}%`
                if (!isPlaying) {
                    clearInterval()
                }
            }, 1000);
        } else {
            setCurrentTime('0:00')
        }
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
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <p style={{ marginRight: '10px', fontSize: '12px' }}>{currentTime}</p>
            <Slider style={{ color: 'grey', width: '350px' }}></Slider>
            <p style={{ marginLeft: '10px', fontSize: '12px' }}>{audio ? secondsToMinutes(audio.duration) : '0:00'}</p>
        </div >
    )
}

export default ProgressBar;
