import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import logo from "../assets/add_a_photo.svg"
import '../index.css'

function SignUp() {
    const [name, setName] = useState('')
    const [profilePicture, setProfilePicture] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const name = localStorage.getItem('name')
        if (name) {
            navigate('/todo')
        }
    }, [navigate])

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setProfilePicture(URL.createObjectURL(file))
        } else {
            setProfilePicture(null)
        }
    }

    const handleSubmit = () => {
        localStorage.setItem('name', name)
        localStorage.setItem('profilePicture', profilePicture)

        if (!profilePicture) {
            alert("Please add your profile picture.")
            return;
        }

        if (!name) {
            alert("Please add your name.")
            return;
        }

        navigate('/todo')
    }

    return (
        <section>
            <main>
                <h1 id="SignUpHeader">Get Started</h1>
                <div className="profilePictureDiv">
                    <label className="profilePicture" htmlFor="profilePicture"><span>add a photo</span></label>
                    <div className="file-upload">
                        <label htmlFor="fileInput">
                            {profilePicture ? (
                                <img className="profile-picture-preview" src={profilePicture} alt="Profile Preview" />
                            ) : (
                                <img className="profile-picture-icon" src={logo} alt="Profile Icon" />
                            )}
                            <input type="file" id="fileInput" accept="image/*" onChange={handleProfilePictureChange} />
                        </label>
                    </div>
                </div>
                <div>
                    <label className="inputLabel" htmlFor="name"><span>fill in your name</span></label>
                    <input type="text" id="name" placeholder="your name" value={name} onChange={handleNameChange} />
                </div>
                <button className="signInButton" onClick={handleSubmit}>Sign In</button>
            </main>
        </section>
    )
}

export default SignUp