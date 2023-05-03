import { useState, useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import logo from "../assets/react.svg"
import '../index.css'

const Home = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const name = localStorage.getItem('name')
        if (name) {
            navigate('/todo')
        }
    }, [navigate])

    return (
        <section>
            <img className="logo" src={logo} alt='logo' />
            <h1 className="getStarted">Keep Track Of Daily Tasks In life</h1>
            <NavLink className="getStartedLink" to="/signup">
                <button>Get Started</button>
            </NavLink>
        </section>
    )
}

export default Home