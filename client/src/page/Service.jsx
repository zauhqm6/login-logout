import Cards from "../components/Cards";
import Navbar from "../components/Navbar";
import { useAuth } from "../store/auth";

const Service = () => {
    const { services } = useAuth();

    return (
        <>
            <Navbar />
            <div className="container">
                <h1>Service</h1>

                <div className="row gx-4">
                    {services.map((curElem, index) => (
                        <Cards
                            key={index}
                            service={curElem.service}
                            description={curElem.description}
                            price={curElem.price}
                            provider={curElem.provider}
                        />
          ))}
                </div>
            </div>
        </>
    );
};

export default Service;
