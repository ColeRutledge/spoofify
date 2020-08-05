import React from 'react';

const TopNav = () => {
    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', height: '75px', position: 'absolute', top: '0px', right: '0px', left: '0px', backgroundColor: 'hsl(0deg, 0%, 0%)' }}>
            <h1 style={{ color: 'white' }}>Logo</h1>
            <div style={{ color: 'white' }}>
                <p>Register</p>
                <p>Login</p>
            </div>
        </nav>
    )
}

export default TopNav;
