import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import "./Talent.scss";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import Artpieces from "../../pages/artpieces/Artpieces.jsx";
import axios from "axios";
import { Outlet } from "react-router-dom";

export default function Talent() {
  const { id } = useParams();
  const [talent, setTalent] = useState(null);

  useEffect(() => {
    const fetchTalent = async () => {
      try {
        if(id){
          const response = await axios.get("http://localhost:3000/users/" + id);
          console.log(response.data);
          setTalent(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTalent();
  }, []);

  return (
    <>
      <div className="talent-profile">
        <div className="talent-profile--left">
          <Sidebar talent={talent} />
        </div>

        <div className="talent-profile--right">
          <img src={talent} className="talent-profile__bg-img" />
          <div className="talent-profile__button-container">
            <div className="talent-profile__button-container--left">
              <button className="talent-profile__button-item active">
                <i className="bx bx-palette"></i>
                Artworks
              </button>
              <button className="talent-profile__button-item">
                <i className="bx bx-info-circle"></i>
                About
              </button>
              <button className="talent-profile__button-item">
                <i className="bx bx-cart"></i>
                Commissions
              </button>
              <button className="talent-profile__button-item">
                <i className="bx bx-star"></i>
                Reviews
              </button>
            </div>

            <div className="talent-profile__button-container--right">
              <button className="talent-profile__button-item active mg-0">
                <i className="bx bx-palette"></i>
                Upload artwork
              </button>
            </div>
          </div>
          <hr />
          <Outlet talentId={id}/>
        </div>
      </div>
      {/* <Artpieces talentId={talent?._id} /> */}
    </>
  );
}
