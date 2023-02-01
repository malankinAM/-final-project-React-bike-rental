const List = ({children, className}) => {

    return(
        <ul className={className}>
            {children.map(item =>
                <li key={item} className={`${className}-item`}>{item}</li>
            )}
        </ul>
    )
}

export default List