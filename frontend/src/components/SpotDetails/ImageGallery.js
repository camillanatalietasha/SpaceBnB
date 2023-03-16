function ImageGallery ({ spotImages }) {
  return (
    <div className="spot-image-gallery">
      {spotImages.map(i => (
        <div key={i.id} className={i.isPreview ? "main-img-tile" : "small-image-tile"}>
          <img key={i.id} className="gallery-img" src={i.imgUrl} alt="spot-details" />
        </div>
      ))}
    </div>
  )
};

export default ImageGallery;