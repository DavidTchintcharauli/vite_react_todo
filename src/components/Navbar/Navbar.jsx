const Navbar = ({ NavComponent }) => {
    const profilePicture = localStorage.getItem('profilePicture')
    const name = localStorage.getItem('name')

    return (
        <nav>
            <header>
                <div><h2>TO DO</h2></div>
                <div className="navDiv">
                    <span className="userName">{name}</span>
                    {profilePicture && profilePicture !== "null" && (
                        <img className="profilePictureNav" src={profilePicture} alt="Profile" />
                    )}
                </div>
            </header>
        </nav>
    )
}

export default Navbar
