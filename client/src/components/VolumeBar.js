import React, { useContext, useEffect } from 'react';
import { Slider } from '@material-ui/core';
import UserContext from '../context/UserContext';

const VolumeBar = () => {

    const { volume, setVolume, isPlaying } = useContext(UserContext)

    const audio = document.getElementById('song')

    const volumeSlider = () => {
        const sliderValue = document.querySelector('.volume').childNodes[3].getAttribute('aria-valuenow')
        setVolume(sliderValue / 100)
        if (!isNaN(volume)) {
            audio.volume = parseFloat(volume)
            localStorage.setItem('volume', audio.volume)
        }
    }

    useEffect(() => {
        if (audio) {
            if (!isNaN(volume)) {
                audio.volume = parseFloat(volume)
            }
            const slider = document.querySelector('.volume').childNodes[1]
            const thumb = document.querySelector('.volume').childNodes[3]
            thumb.setAttribute('aria-valuenow', volume * 100)
            slider.style.width = `${volume * 100}%`
            thumb.style.left = `${volume * 100}%`
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPlaying])

    return (
        audio ? <Slider className='volume' onChange={volumeSlider} style={{ width: '100px', color: 'grey' }} /> : <Slider disabled className='volume' onChange={volumeSlider} style={{ width: '100px', color: 'grey' }} />
    )
}

export default VolumeBar;
