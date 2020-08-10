import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserContext from '../context/UserContext'
import FavoriteIcon from '@material-ui/icons/Favorite'
import Button from '@material-ui/core/Button'
import SongModal from './SongModal'

const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL

const AlbumPage = () => {
    const { id } = useParams()
    const { auth, setPointer, setSongs, setIsPlaying } = useContext(UserContext)
    const [allSongs, setAllSongs] = useState([]);
    const [album, setAlbum] = useState({})
    const [albumUrl, setAlbumUrl] = useState('')
    const audio = document.getElementById('song');


    useEffect(() => {
        const fetchAlbum = async () => {
            try {
                const res = await fetch(`${apiUrl}/api/album/${id}/songs`, {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || auth}` }
                })

                if (res.ok) {
                    const data = await res.json();
                    setAlbum(data)
                    setAllSongs(data.songs)
                    setAlbumUrl(data.songs[0].album_image_url)
                    // console.log(data)
                }
            } catch (err) {
                console.error(err)
            }
        }
        fetchAlbum()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const playSong = async (e) => {
        e.preventDefault()
        const songId = e.target.getAttribute('id')
        try {
            const res = await fetch(`${apiUrl}/api/album/song/${songId}`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || auth}` }
            })

            if (res.ok) {
                const data = await res.json();
                localStorage.setItem('currentSongPointer', 1);
                setPointer(1)
                setSongs(data)
                localStorage.setItem('currentSong', data)
                localStorage.setItem('currentTime', 0)
                audio.setAttribute('src', data[localStorage.getItem('currentSongPointer') - 1].song_url)
                audio.play()
                setIsPlaying(true)

            }
        } catch (err) {
            console.error(err)
        }
    }

    const playAlbum = async (e) => {
        try {
            const res = await fetch(`${apiUrl}/api/album/${id}/songs`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || auth}` }
            })

            if (res.ok) {
                const data = await res.json();
                const songsData = data.songs
                setSongs(data.songs)
                localStorage.setItem('currentSongPointer', 1);
                localStorage.setItem('currentSong', data.songs)
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

    const cardContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
    }

    const cardStyles = {
        display: 'grid',
        gridTemplateColumns: '1fr .5fr',
        justifyItems: 'end',
        alignItems: 'center',
        color: '#FFF',
        margin: '4px 3px',
        padding: '0 15px',
        minHeight: '55px',
        borderRadius: '5px',
        backgroundColor: '#282828',
        boxShadow: '0 10px 30px 0 rgba(0,0,0,.3), 0 1px 2px 0 rgba(0,0,0,.2)',
    }

    const headerStyles = {
        padding: '50px 0 20px 53px',
        margin: '0 10px',
        fontSize: '24px',
        lineHeight: '28px',
        color: 'hsla(0,0%,100%,1)',
    }

    return (
        <>
            <div style={{ paddingTop: '90px' }}></div>
            <div style={{ padding: '30px 30px', display: 'flex' }}>
                <img style={{ marginRight: '30px', width: '250px', height: '250px', boxShadow: '0 10px 30px 0 rgba(0,0,0,.3)' }} alt='img.jpg' src={albumUrl} />
                <div style={{ color: 'hsla(0,0%,100%,1)' }}>
                    <h1 style={{ fontSize: '15px' }}>Album</h1>
                    <h1 style={{ fontSize: '50px', marginTop: '0px', marginBottom: '15px' }}>{album.album_name}</h1>
                    <h1 style={{ fontSize: '15px', color: 'hsla(0,0%,100%,1)' }}>By <span style={{ color: '#b3b3b3' }}>{album.artist}</span></h1>
                    <h1 style={{ fontSize: '15px', color: '#b3b3b3' }}>{allSongs.length} songs</h1>
                    <div style={{ marginTop: '10px', }}>
                        <Button onClick={playAlbum} style={{ backgroundColor: '#1DB954', borderRadius: '25px', color: 'white', fontFamily: 'inherit', fontSize: '15px', padding: '5px 40px' }}>Play</Button>
                        <Button><FavoriteIcon style={{ color: 'hsla(0,0%,100%,.3)' }} /></Button>
                    </div>
                </div>
            </div>
            <div style={cardContainerStyle}>
                {allSongs.map((song, i) => (
                    <React.Fragment key={i}>
                        <div style={{ display: 'grid', gridTemplateColumns: '50px 1fr', alignItems: 'center', justifyItems: 'center' }}>
                            <SongModal songId={song.id}></SongModal>
                            <a className='songCards' style={{ cursor: 'pointer', width: '100%' }} id={song.id} href="/" onClick={playSong} >
                                <div style={{ ...cardStyles, pointerEvents: 'none' }}>
                                    <div style={{ justifySelf: 'start', pointerEvents: 'none' }}>{song.title}
                                        <div style={{ marginTop: '5px', pointerEvents: 'none', justifySelf: 'center', fontSize: '15px', color: '#b3b3b3' }}>{song.artist_name}
                                            <span style={{ marginLeft: '13px', pointerEvents: 'none' }}>•</span>
                                            <span style={{ marginLeft: '13px', justifySelf: 'center', pointerEvents: 'none', color: '#b3b3b3', display: 'inline' }}>{song.album_title}</span>
                                        </div>
                                    </div>
                                    <div style={{ alignSelf: 'center' }}>{song.song_length}</div>
                                </div>
                            </a>
                        </div>
                        {allSongs[i + 1] !== undefined && song.artist !== allSongs[i + 1].artist
                            && <div style={{ ...headerStyles, fontSize: '19px', paddingLeft: '5px', color: '#b3b3b3', justifySelf: 'start' }}
                            >{allSongs[i + 1].artist}</div>}
                    </React.Fragment>
                ))}
            </div>
        </>
    )
}

export default AlbumPage;
