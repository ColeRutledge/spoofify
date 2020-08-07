import React, { useEffect, useContext, useState } from 'react';
import UserContext from '../context/UserContext';
import { Button } from '@material-ui/core'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL

const Albums = () => {
    const { auth, setSongs, pointer, setPointer, setIsPlaying, songs } = useContext(UserContext)
    const audio = document.getElementById('song')

    const playAlbum = async (e) => {
        const albumId = e.target.getAttribute('id')
        try {
            const res = await fetch(`${apiUrl}/album/${albumId}/songs`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || auth}` }
            })

            if (res.ok) {
                const data = await res.json();
                const songsData = data.album.songs
                setSongs(data.album.songs)
                localStorage.setItem('currentSongPointer', 1);
                setPointer(1)
                localStorage.setItem('currentTime', 0)
                audio.setAttribute('src', songsData[localStorage.getItem('currentSongPointer') - 1].song_url)
                audio.play()
                setIsPlaying(true)

            }
        } catch (err) {
            console.error(err)
        }
    }

    const [albums, setAlbums] = useState([])
    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const res = await fetch(`${apiUrl}/album`, {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || auth}` }
                })

                if (res.ok) {
                    const data = await res.json()
                    setAlbums([...data.albums])

                }
            } catch (err) {
                console.error(err)
            }
        }
        fetchAlbums()
    }, [auth, audio])

    const cardContainerStyle = {
        padding: '20px 0 50px 50px',
        display: 'grid',
        gridGap: '16px',
        gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))',
    }

    const cardStyles = {
        display: 'grid',
        margin: '0 8px',
        padding: '25px 18px',
        borderRadius: '10px',
        backgroundColor: '#282828',
        justifyItems: 'center',
        boxShadow: '0 10px 30px 0 rgba(0,0,0,.3), 0 1px 2px 0 rgba(0,0,0,.2)',
    }

    return (
        <>
            <div style={cardContainerStyle}>
                {albums.map(album => (
                    <div key={album.id}>
                        <div className='image-container'>
                            <img
                                style={{
                                    alignContent: 'end',
                                    marginBottom: '20px',
                                }}
                                src={album.image_url}
                                height='200px'
                                width='200px'
                                alt='album.jpg'
                                draggable='false'
                            />
                            <div className='after'>
                                <button onClick={playAlbum} id={album.id} style={{ backgroundColor: 'transparent', border: 'none', outline: 'none', cursor: 'pointer' }}>
                                    <PlayCircleOutlineIcon style={{ fontSize: '100px', pointerEvents: 'none' }} />
                                </button>
                            </div>
                        </div>
                        <div style={{ justifySelf: 'start', marginLeft: '10px' }}>
                            <div style={{
                                marginBottom: '7px',
                                color: '#fff',
                                textDecoration: 'none',
                                fontSize: '16px',
                                lineHeight: '24px'
                            }}>{album.title}</div>
                            <div style={{
                                color: '#b3b3b3',
                                fontSize: '11px',
                                lineHeight: '16px'
                            }}>Album</div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Albums
