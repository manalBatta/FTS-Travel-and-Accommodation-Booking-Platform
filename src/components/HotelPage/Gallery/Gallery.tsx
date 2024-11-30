import React, { useState } from "react";
import { Photo } from "../../../Types";
import { motion } from "motion/react";
import "./Gallery.css";

interface ColumnProps {
  photos: Photo[];
  onImageClick: (url: string) => void;
}

interface GalleryProps {
  gallery: Photo[];
  columns?: number;
}

const Column: React.FC<ColumnProps> = ({ photos, onImageClick }) => (
  <div className="column">
    {photos.map((photo, index) => (
      <motion.img
        whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.95, transition: { duration: 0.2 } }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        key={index}
        src={photo.url}
        alt="gallery"
        onClick={() => onImageClick(photo.url)}
      />
    ))}
  </div>
);

const Gallery: React.FC<GalleryProps> = ({ gallery, columns = 3 }) => {
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);

  const columnPhotos: Photo[][] = Array.from({ length: columns }, () => []);
  gallery.forEach((photo, index) => {
    columnPhotos[index % columns].push(photo); // Distribute photos across columns
  });

  return (
    <>
      {fullScreenImage && (
        <div
          className="full-screen-modal"
          onClick={() => setFullScreenImage(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            cursor: "pointer",
          }}>
          <img
            src={fullScreenImage}
            alt="Full Screen"
            style={{ maxHeight: "90%", maxWidth: "90%" }}
          />
        </div>
      )}
      <div className="row">
        {columnPhotos.map((photos, columnIndex) => (
          <Column
            key={columnIndex}
            photos={photos}
            onImageClick={setFullScreenImage}
          />
        ))}
      </div>
    </>
  );
};

export default Gallery;
