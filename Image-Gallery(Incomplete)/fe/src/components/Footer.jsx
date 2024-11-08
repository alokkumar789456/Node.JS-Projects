import '../App.css';

const Footer = () => {
    return (
        <footer className="footer">
           {/*eslint-disable-next-line*/} 
            <marquee behavior="scroll" direction="left" className="marquee">
                © 2024 ImageGallery. All rights reserved.
            </marquee>
        </footer>
    );
};

export default Footer;
