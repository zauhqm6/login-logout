import Cards from "../components/Cards";
import { useAuth } from "../store/auth";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const AminService = () => {
    const { services } = useAuth();

    return (
        <>
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

export default AminService;
