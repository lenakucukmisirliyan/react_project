import { FormattedMessage } from "react-intl";
import anonimPhoto from "../../assets/anonim_photo.png";

const About = () => {
    return (
        <div className="about-container">
            <div className="about-photo">
                <img src={anonimPhoto} alt="Profil" />
            </div>
            <div className="about-content">
                <h2><FormattedMessage id="about.title" /></h2>
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
    );
}


export default About;