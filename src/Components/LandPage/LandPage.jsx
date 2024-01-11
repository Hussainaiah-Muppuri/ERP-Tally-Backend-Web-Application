import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LandPage.css';

const LandPage = () => {
    return (
        <div className='land'>
            <nav className="navbar">
                <div>
                    <a href="/UserLogin">Login</a>
                </div>
            </nav>
            <h1>Welcome to Our Accounting Platform</h1>

            <p className="para ">
                "The balance sheet is a snapshot <br />
                of a company's financial condition <br />
                at a specific moment in time."
            </p>
            <div className='marq'>
                <marquee behavior="scroll" direction="left">
                    <p>
                        "Accounting is the language of business.
                        It tells the story of a business's financial performance
                        and financial position."
                    </p>
                </marquee>
            </div>

        </div>
    );
};

export default LandPage;
