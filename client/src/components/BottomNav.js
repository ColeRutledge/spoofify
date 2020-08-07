import React from 'react';
import { IconButton } from '@material-ui/core'
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
// import { Link } from 'react-router-dom';

const BottomNav = () => {
    return (
        <nav style={{ padding: '0 25px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100px', position: 'absolute', bottom: '0px', right: '0px', left: '0px', backgroundColor: 'hsl(0deg, 0%, 0%)' }}>
            <p style={{ color: 'white' }}>Tech Stack</p>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ marginRight: '30px', textAlign: 'center' }}>
                    <p style={{ color: 'white' }}>Chris Tran</p>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <IconButton href='https://github.com/ctran01' aria-label='github'>
                            <GitHubIcon style={{ color: 'white' }} />
                        </IconButton>
                        <IconButton aria-label='linkedin'>
                            <LinkedInIcon style={{ color: 'white' }} />
                        </IconButton>
                    </div>
                </div>
                <div style={{ marginRight: '30px', textAlign: 'center' }}>
                    <p style={{ color: 'white' }}>Cole Rutledge</p>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <IconButton href='https://github.com/ColeRutledge' aria-label='github'>
                            <GitHubIcon style={{ color: 'white' }} />
                        </IconButton>
                        <IconButton aria-label='linkedin'>
                            <LinkedInIcon style={{ color: 'white' }} />
                        </IconButton>
                    </div>
                </div>
                <div style={{ marginRight: '30px', textAlign: 'center' }}>
                    <p style={{ color: 'white' }}>Marco Serrano</p>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <IconButton href='https://github.com/serranomarco' aria-label='github'>
                            <GitHubIcon style={{ color: 'white' }} />
                        </IconButton>
                        <IconButton href='https://www.linkedin.com/in/marco-serrano-3916731b2' aria-label='linkedin'>
                            <LinkedInIcon style={{ color: 'white' }} />
                        </IconButton>
                    </div>
                </div>

            </div>
        </nav>
    )
}

export default BottomNav;
