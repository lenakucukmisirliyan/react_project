import { FormattedMessage } from "react-intl";

const About = () => {
    return(
        <div className="about-paper" style={{ marginTop: 50 }}>
            <h2 style={{ marginBottom: 25, padding: 40, color:'black'}}><FormattedMessage id="about.title" /></h2>
            <p className="typewriter" style={{color:'black'}}>
                {'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui molestias reprehenderit inventore doloremque iste voluptas earum assumenda mollitia laborum id maxime eaque corrupti fugit harum, veniam, aliquid hic. Voluptas odit maxime nemo delectus eius assumenda illum dolores odio sapiente deleniti adipisci labore iste impedit quibusdam, culpa magnam nulla, provident at.'}
            </p>
        </div>
    );
}


export default About;