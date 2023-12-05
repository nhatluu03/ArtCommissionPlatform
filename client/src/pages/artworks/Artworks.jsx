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
        const response = await axios.get(
          "https://api.slingacademy.com/v1/sample-data/photos?offset=5&limit=50"
        );
        const data = await response.data;
        setArtworks(data.photos);
        // console.log(response.photos)
      } catch (error) {
        console.log(error);
      }
    };
    fetchArtworks();
  }, []);

  const [selectedArtworkIndex, setSelectedArtworkIndex] = useState(null);
  const openModal = (index) => {
    setSelectedArtworkIndex((prevIndex) => {
      return index;
    })
  };

  const closeModal = () => {
    setSelectedArtworkIndex(null);
  };

  const nextArtwork = () => {
    setSelectedArtworkIndex((prevIndex) => (prevIndex + 1) % artworks.length);
  };

  const prevArtwork = () => {
    setSelectedArtworkIndex(
      (prevIndex) => (prevIndex - 1 + artworks.length) % artworks.length
    );
  };

  return (
    <>
      {selectedArtworkIndex && (
        <div>
          {selectedArtworkIndex !== null && (
            <Artwork
              artwork={artworks.filter((artwork) => artwork.id === selectedArtworkIndex)[0]}
              onClose={closeModal}
            />
          )}

          <button onClick={prevArtwork}>Previous</button>
          <button onClick={nextArtwork}>Next</button>
        </div>
      )}

      <div className="artwork-container">
        {artworks.map((artwork, index) => {
          return (
            <div key={index} className="artwork-item">
              {/* <Link to={`/artworks/${artwork.id}`}> */}
              {/* </Link> */}
              <img src={artwork.url} alt={artwork.title} onClick={() => {openModal(artwork.id)}}/>

              <div className="artwork-item__details">
                <Link className="artwork-item__author">
                  <img src={artwork.url} alt={artwork.title} />
                  <span>Author name</span>
                </Link>
                <div className="artwork-item__reacts">
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAdhJREFUSEvV1MurTmEYBfDfiUwRItdSGCjJwCWXJDGlGCi5TFxG/hUjl4wwoSgGZuR+KSkGipQIA5dSUgaE1un9tL9t7+/bnTrJW3v07netZz3PetaIcT4j44zvnxHsxnaswi/cwXlcKop3IN9aRot8gAs4V+9IXcEMnMXWltaFaBJWttxfwX587N1XCSbgNtbgAw7iHn5gA05henkYgAO4hYnl/gSmFYyN+Jl/qwSHcByfsQxva1XOxdXSss14V7ufjyeYgr04Uyd4hBXYh9NjdFdUncRNREWfgu9Fbip5M0aCxXiO95jVRjCvoT1d+ZbgWXkfnD4F97Eae4qTuoJW/zuMY7iMbXWCIziKT1jeMMRhhHPwFJOxs+xFn4L4Oyoy6BdYX3o5DDj3M4s9F+Ea4rLRU1+0DCYOyLC6kqTy6wh4BpydyR41EvSqyYItxMvyoO753vuA38WCAr6utPiP6rawi+QoiStel8ypk1TB0/v4PvPrO4PSNLGQ7GkiqYI/xqaSAH/Na1hch+QGllaUJHuiLm15WAb6pc0JwwjybmohST69Kmk6uzhuC74OslkXgh5JkjZKcmKCRPpA8CabDiomSi4i7diFb10WpKuCLliN//z/BL8BMG5eGQAMP+8AAAAASUVORK5CYII=" />
                  <p>30</p>
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
