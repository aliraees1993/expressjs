import { Footer as ArwesFooter, Paragraph } from "arwes";
import Centered from "./Centered";

const Footer = () => {
    return (
        <ArwesFooter animate>
            <Centered>
                <Paragraph style={{ fontSize: 14, margin: "10px 0" }}>
                    This site is only for personal learning and not associated
                    with nasa or any other organization
                </Paragraph>
            </Centered>
        </ArwesFooter>
    );
};

export default Footer;
