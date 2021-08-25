const Card = ({ data }) => {
    return (
        <li className="col">
            <div className="card bg-dark">
                <h2 className="card-header text-center">{data.tag}</h2>
                <div className="card-body">
                    <p className="card-text">
                        {data.question}{data.tag === "KITENDAWILI" ? "." : ","}
                        <span className="text-info"> {data.answer}</span>
                    </p>
                </div>
                <div className="card-footer fs-5">
                    <small className="text-muted">Contributed by {data.contributor}</small>
                </div>
            </div>
        </li>
    )
}

export default Card
