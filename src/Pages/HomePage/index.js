
import Header from "../../Components/client/Header/Header";
import Slides from "../../Components/client/Slides/Slides";
import Personnel from "../../Components/client/Personnel/Personnel";
import PopularService from "../../Components/client/PopularService/PopularService";
import AboutUs from "../../Components/client/AboutUs/AboutUs";
import Footer from "../../Components/client/Footer/Footer";


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