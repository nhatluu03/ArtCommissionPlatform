import {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import "./Artpieces.scss";
import axios from 'axios';

export default function Artpieces() {
  const { id } = useParams();
  // if (!talentId) {
  //   return null;
  // }
  const [artpieces, setArtpieces] = useState([]);
  
  useEffect(() => {
    const fetchArtpieces = async () => {
      try {
        const response = await axios.get("http://localhost:3000/artworks/talent/" + id);
        console.log(response.data);
        setArtpieces(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchArtpieces();
  }, []);

  return (
    <div className="artpieces">
        <div className="artpiece-container">
            {artpieces.map((artpiece, index) => {
                return (<div className="artpiece-item" key={index}> 
                <img src={artpiece.images[0]} alt="" />
            </div>)
            })}
            
            {/* <div className="artpiece-item"> 
                <img src="https://i.pinimg.com/736x/51/fa/9e/51fa9e365265c97b6433b2033451297b.jpg" alt="" />
            </div>
            <div className="artpiece-item"> 
                <img src="https://i.pinimg.com/564x/f5/3c/37/f53c379e64d62ea962b9c7a2f198ac6d.jpg"/>
            </div>
            <div className="artpiece-item"> 
                <img src="https://i.pinimg.com/564x/c6/b3/a6/c6b3a697b075b8abb639dd3b51c81551.jpg" alt=""/>
            </div>
            <div className="artpiece-item"> 
                <img src="https://i.pinimg.com/736x/51/fa/9e/51fa9e365265c97b6433b2033451297b.jpg" alt="" />
            </div> */}
        </div>
    </div>
  )
}
