import React from 'react'
import { HiShoppingCart, HiHeart } from 'react-icons/hi';
import { GoPerson } from 'react-icons/go';
import { AiOutlineInfoCircle, AiOutlineClockCircle, AiFillCustomerService } from 'react-icons/ai';

export default function Navbar() {
    return (
        <>
            <div className="bg-dark d-flex flex-row" style={{ minHeight: '40px', justifyContent: 'center' }}>
                <div style={{ color: 'white', display: 'flex', margin: '5px 10px 0' }}>
                    <a href='/' alt='Available products' title='Check available products' style={{ textDecoration: 'none', color: 'white' }}>
                        <span className="mr-3" style={{ fontSize: '14px' }}>
                            <AiOutlineInfoCircle size={18} style={{ marginRight: '3px' }} />
                            Check available products
                        </span>
                    </a>
                </div>
                <div style={{ color: 'white', display: 'flex', margin: '5px 10px 0' }}>
                    <a href='/' alt='Working hours' title='Working hours' style={{ textDecoration: 'none', color: 'white' }}>
                        <span className="mr-3" style={{ fontSize: '14px' }}>
                            <AiOutlineClockCircle size={18} style={{ marginRight: '3px' }} />
                            Working hours
                        </span>
                    </a>
                </div>
                <div style={{ color: 'white', display: 'flex', margin: '5px 10px 0' }}>
                    <a href='/' alt='Support' title='Support' style={{ textDecoration: 'none', color: 'white' }}>
                        <span className="mr-3" style={{ fontSize: '14px' }}>
                            <AiFillCustomerService size={18} style={{ marginRight: '3px' }} />
                            Support
                        </span>
                    </a>
                </div>
            </div>
            <div className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <a href="../" className="navbar-brand">MyIKEA App</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav" style={{ marginRight: 'auto' }}>
                            <li className="nav-item">
                                <a href="/specialOffers" className="nav-link">Special offers</a>
                            </li>
                            <li className="nav-item">
                                <a href="/admin" className="nav-link">Admin panel</a>
                            </li>
                        </ul>
                        <div className="d-flex justify-content-end">
                            <form className="d-flex">
                                <input className="form-control me-sm-2" type="text" placeholder="Search" />
                            </form>
                        </div>
                        <ul className="navbar-nav">
                            <li className="nav-item" style={{ margin: '0 5px' }}>
                                <a href='/profile' title='Cart' style={{ textDecoration: 'none', color: 'black' }}>
                                    <GoPerson size={24} />
                                </a>
                            </li>
                            <li className="nav-item" style={{ margin: '0 5px' }}>
                                <a href='/favorite' title='Cart' style={{ textDecoration: 'none', color: 'black' }}>
                                    <HiHeart size={24} />
                                </a>
                            </li>
                            <li className="nav-item" style={{ margin: '0 5px' }}>
                                <a href='/cart' title='Cart' style={{ textDecoration: 'none', color: 'black' }}>
                                    <HiShoppingCart size={24} />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
