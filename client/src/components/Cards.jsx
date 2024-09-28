// eslint-disable-next-line react/prop-types
const Cards = ({ service, description, price, provider }) => {
    return (
        <>
            <div className="col-md-3">
                <div className="card text-white bg-primary mb-3" style={{ maxWidth: '18rem' }}>
                    <div className="card-header">{service}</div>
                    <div className="card-body">
                        <p className="card-text">{description}</p>
                        <h5 className="card-title">{price}</h5>
                        <p className="card-text">{provider}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cards;
