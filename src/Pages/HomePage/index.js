import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import Slides from "../../Components/Slides/Slides";
import Personnel from "../../Components/Personnel/Personnel";
import PopularService from "../../Components/PopularService/PopularService";
import AboutUs from "../../Components/AboutUs/AboutUs";

function HomePage () {
    return(
        <>
            <Header/>
            <Slides/>
            <Personnel/>
            <PopularService/>
            <AboutUs/>
            <Footer/>
        </>
    )
}

export default HomePage;