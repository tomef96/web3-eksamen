import React from 'react'
import './style.css'

const SideNav = () => {
    return (
        <div className="side-nav nav flex-md-column flex-row">
            <h5 className="side-nav-header">Actions</h5>
            <ul className="p-0 m-0">
                <div
                    className="side-nav-button"
                    data-toggle="modal"
                    data-target="#createProductModal"
                >
                    New Product
                </div>
            </ul>
        </div>
    )
}

export default SideNav
