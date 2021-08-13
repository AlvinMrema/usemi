const Card = ({ data }) => {
    return (
        <li className="col">
            <div className="card bg-dark">
                <h2 className="card-header text-center">{data.tag}</h2>
                <div className="card-body">
                    <p className="card-text">
                        {data.content.question}{data.tag === "KITENDAWILI" ? "." : ","}
                        <span className="text-info"> {data.content.answer}</span>
                    </p>
                </div>
                <div className="card-footer fs-5">
                    <small className="text-muted">Authored by {data.author}</small>
                </div>
            </div>
        </li>
    )
}

export default Card
