const PhotosItem = ({className, img, onClick}) => {
    return (
        <div className={className} style={{backgroundImage: `url(${img})`}} onClick={onClick}>
        </div>
    )
}

export default PhotosItem;