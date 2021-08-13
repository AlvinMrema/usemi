const CardsList = ({cardItems}) => {
    return (
        <ul className="row row-cols-1 row-cols-lg-3 g-4 mt-1">
            {cardItems}
        </ul>
    )
}

export default CardsList