import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <header className="header">
                <div className="container text-center">
                    <div className="row">
                        <div className="col col-automy-auto">
                            <a href="/" className="logo">AWesoMe pHoto</a>
                        </div>
                        
                        
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;