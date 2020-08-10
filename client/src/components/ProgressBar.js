import React, { useContext, useEffect, useState } from 'react';
import { Slider } from '@material-ui/core'
import UserContext from '../context/UserContext';



const ProgressBar = () => {
    const { currentTime, setCurrentTime, isPlaying, setIsPlaying, isLooping, songs, pointer, setPointer, isShuffling } = useContext(UserContext);

    const audio = document.getElementById('song');
    const slider = document.querySelector('.MuiSlider-track');
    const thumb = document.querySelector('.MuiSlider-thumb')

    const [myInterval, setMyInterval] = useState();
    const [step, setStep] = useState(1);
    const [isSeeking, setIsSeeking] = useState(false);

    const seeking = () => {
        setIsSeeking(true);
    }

    const seekTime = () => {
        if (!isNaN(thumb.getAttribute('aria-valuenow') / step)) {
            audio.currentTime = thumb.getAttribute('aria-valuenow') / step
            setCurrentTime(audio.currentTime)
            setIsSeeking(false)
        }
    }

    useEffect(() => {
        if (audio && !isNaN(audio.duration)) {
            setStep(100 / audio.duration)
        }
        let interval;
        if (!isPlaying) {
            clearInterval(myInterval)
        }
        if (audio && isPlaying && !isSeeking) {
            interval = setInterval(() => {
                setCurrentTime(audio.currentTime)
                localStorage.setItem('currentTime', audio.currentTime)
                slider.style.width = `${(audio.currentTime / audio.duration) * 100}%`
                thumb.setAttribute('aria-valuenow', (audio.currentTime / audio.duration) * 100)
                thumb.style.left = `${(audio.currentTime / audio.duration) * 100}%`
                if (!isLooping && audio.ended) {
                    if (songs.length > pointer) {
                        setPointer(pointer + 1)
                        localStorage.setItem('currentSongPointer', `${pointer + 1}`)
                    } else {
                        setIsPlaying(false)
                        audio.pause()
                    }
                }
                if (isLooping && audio.ended) {
                    audio.currentTime = 0
                    audio.play()
                }
                if (!isPlaying) {
                    clearInterval()
                }
            }, 1000);
            setMyInterval(interval)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPlaying, audio])

    useEffect(() => {
        if (isShuffling) {
            const randomInt = Math.floor(Math.random() * Math.floor(songs.length)) + 1
            setPointer(randomInt)
            localStorage.setItem('currentSongPointer', randomInt)
            if (audio) {
                audio.currentTime = 0
            }
        } else {
            setPointer(1)
            localStorage.setItem('currentSongPointer', 1)
            if (audio) {
                audio.currentTime = 0
            }
        }
    }, [isShuffling])

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
            {audio ? <Slider onClick={seekTime} onMouseDown={seeking} onMouseUp={seekTime} step={step} style={{ color: 'grey', width: '350px', marginBottom: '2px' }}></Slider> : <Slider disabled step={step} style={{ color: 'grey', width: '350px', marginBottom: '2px' }}></Slider>}
            {/* <p style={{ marginLeft: '15px', fontSize: '12px' }}>{audio ? secondsToMinutes(audio.duration) : '0:00'}</p> */}
            <p style={{ marginLeft: '15px', fontSize: '12px' }}>{audio ? !isNaN(audio.duration) ? secondsToMinutes(audio.duration) : '0:00' : '0:00'}</p>
        </div >
    )
}

export default ProgressBar;
