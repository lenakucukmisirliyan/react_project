import { FormattedMessage } from "react-intl";
import myPhoto from "../../assets/my_photo.png";
import { MdOutlineFileDownload, MdLocationOn } from "react-icons/md";
import { FaPhoneSquare } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoIosMail } from "react-icons/io";

const About = () => {
    return (
        <div className="about-container">
            <h2><FormattedMessage id="about.title" /></h2>

            <div className="about-main">
                <div className="about-photo">
                    <img src={myPhoto} alt="Profil" />

                    <h1 className="rainbow-text">LENA KÜÇÜKMISIRLIYAN</h1>
                    <h6>Front-End Developer</h6>
                    <a href="/files/CV.pdf" download>
                        <FormattedMessage id="download"></FormattedMessage> <MdOutlineFileDownload className="icon-download" />
                    </a>
                </div>

                <div className="about-content">

                    <div className="info-part">
                        <div className="div1">
                            <p> <FaPhoneSquare className="icon-phone" /> +90 534 380 66 45 </p>
                            <p> <IoIosMail className="icon-mail" /> lenakucukmisirliyan@gmail.com</p>
                        </div>
                        <div className="div2">

                            <p> <CgProfile className="icon-profile" /> 28 yrs</p>
                            <p> <MdLocationOn className="icon-location" /> İstanbul/Türkiye</p>
                        </div>
                    </div>

                    <p>
                        {`Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui molestias reprehenderit inventore 
                        doloremque iste voluptas earum assumenda mollitia laborum id maxime eaque corrupti fugit harum, 
                        veniam, aliquid hic. Voluptas odit maxime nemo delectus eius assumenda illum dolores odio sapiente deleniti 
                        adipisci labore iste impedit quibusdam, culpa magnam nulla, provident at.`}
                    </p>
                    <p>
                        {`Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui molestias reprehenderit inventore 
                        veniam, aliquid hic. Voluptas odit maxime nemo delectus eius assumenda illum dolores odio sapiente deleniti 
                        adipisci labore iste impedit quibusdam, culpa magnam nulla, provident at.`}
                    </p>
                </div>
            </div>
        </div>
    );
}


export default About;