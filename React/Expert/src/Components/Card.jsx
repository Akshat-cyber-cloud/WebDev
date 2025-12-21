import React from 'react'
import './Card.css'

const Card = () => {
    return (
        <div id='main'>
            <div className="box1">
                <div className="card">
                    <div className="top">
                        <h2>WEB DESIGN</h2>
                        <p>Crafts Engaging,user-friendly websites.</p>
                        <div className="tags">
                            <span>Landing Page</span>
                            <span>Website</span>
                            <span>OnePage</span>
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    <h3>Explore</h3>
                    <i class="ri-arrow-right-line"></i>
                </div>
            </div>
            <div className="box1">
                <div className="card" style={{ backgroundColor: "lightyellow" }}>
                    <div className="top">
                        <h2>GRAPHIC DESIGN</h2>
                        <p>Create impactful visuals and branding.</p>
                        <div className="tags">
                            <span>Packaging</span>
                            <span>Brand Identity</span>
                            <span>Illustrations</span>
                            <span>Logo</span>
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    <h3>Explore</h3>
                    <i class="ri-arrow-right-line"></i>
                </div>
            </div>
        </div>
    )
}

export default Card