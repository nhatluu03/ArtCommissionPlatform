import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Artwork from "../artwork/Artwork";
import axios from "axios";
import "./Artwork.scss";

const Artworks = () => {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/artworks");
        console.log(response.data);
        setArtworks(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchArtworks();
  }, []);

  const [selectedArtworkIdx, setSelectedArtworkIdx] = useState(null);
  const openModal = (index) => {
    setSelectedArtworkIdx(index);
  };

  const closeArtwork = () => {
    setSelectedArtworkIdx(null);
  };

  const nextArtwork = () => {
    const currentIndex = artworks.findIndex((artwork) => artwork._id === selectedArtworkIdx);
    if (currentIndex !== -1 && currentIndex < artworks.length - 1) {
      setSelectedArtworkIdx(artworks[currentIndex + 1]._id);
    }
  };
  
  const prevArtwork = () => {
    const currentIndex = artworks.findIndex((artwork) => artwork._id === selectedArtworkIdx);
    if (currentIndex !== -1 && currentIndex > 0) {
      setSelectedArtworkIdx(artworks[currentIndex - 1]._id);
    }
  };

  return (
    <>
      {selectedArtworkIdx && (
        <Artwork
          artwork={artworks.find((artwork) => artwork._id === selectedArtworkIdx)}
          closeArtwork={closeArtwork}
          nextArtwork={nextArtwork}
          prevArtwork={prevArtwork}
        />
      )}

      <div className="artwork-container">
        {artworks.map((artwork, index) => { 
          if (!artwork.talent) {
            return;
          }

          return (
            <div key={index} className="artwork-item">
              <img
                src={artwork.images[0]}
                alt={artwork.description}
                onClick={() => {
                  console.log(index);
                  setSelectedArtworkIdx((prev) => {
                    return artwork._id;
                  });
                }}
              />

              <div className="artwork-item__details">
                <Link
                  className="artwork-item__author"
                  to={`http://localhost:5173/talents/${artwork.talent._id}`}
                >
                  <img
                    src={artwork.talent._id}
                    alt={"Avatar of " + artwork.fullname}
                  />
                  <p>{artwork.talent ? artwork.talent.username : ""}</p>
                </Link>
                <div className="artwork-item__reacts">
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAdhJREFUSEvV1MurTmEYBfDfiUwRItdSGCjJwCWXJDGlGCi5TFxG/hUjl4wwoSgGZuR+KSkGipQIA5dSUgaE1un9tL9t7+/bnTrJW3v07netZz3PetaIcT4j44zvnxHsxnaswi/cwXlcKop3IN9aRot8gAs4V+9IXcEMnMXWltaFaBJWttxfwX587N1XCSbgNtbgAw7iHn5gA05henkYgAO4hYnl/gSmFYyN+Jl/qwSHcByfsQxva1XOxdXSss14V7ufjyeYgr04Uyd4hBXYh9NjdFdUncRNREWfgu9Fbip5M0aCxXiO95jVRjCvoT1d+ZbgWXkfnD4F97Eae4qTuoJW/zuMY7iMbXWCIziKT1jeMMRhhHPwFJOxs+xFn4L4Oyoy6BdYX3o5DDj3M4s9F+Ea4rLRU1+0DCYOyLC6kqTy6wh4BpydyR41EvSqyYItxMvyoO753vuA38WCAr6utPiP6rawi+QoiStel8ypk1TB0/v4PvPrO4PSNLGQ7GkiqYI/xqaSAH/Na1hch+QGllaUJHuiLm15WAb6pc0JwwjybmohST69Kmk6uzhuC74OslkXgh5JkjZKcmKCRPpA8CabDiomSi4i7diFb10WpKuCLliN//z/BL8BMG5eGQAMP+8AAAAASUVORK5CYII=" />
                  <p>{artwork.likes}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Artworks;
