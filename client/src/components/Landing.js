import React from 'react'
import TopNav from './TopNav'



const Landing = () => {
  // const body = document.getElementsByTagName('body')[0]
  // console.log(body)
  // body.style.backgroundImage = "url('https://endless-tumblr.s3-us-west-2.amazonaws.com/spotifysplash.png')"
  document.body.style.backgroundColor = '#121212'

  return (
    <div className='splash-page'>
      <TopNav />
    </div>
  )
}

export default Landing;
