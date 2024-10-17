import React, { useEffect ,useState} from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Gallery.css";
import axios from "axios";
import BassURl from "../Api/Api";
import imageURl from "../Api/ImageUrl";
function Gallery() {

  const [gallery, setGallery] = useState()

  useEffect(()=>{
    axios.get(`${BassURl}/all-doctor`).then((res)=>{
      console.log(res.data.data)
      setGallery(res.data.data)
    })
  },[])


  return (
    <div>
      <Navbar />
      <div className="container ">
        <div className="gallery-head">
          <h1>Look & feel like a superhero</h1>
          <p>
          It is this strength with which you operate that inspires us to honor your road to achieving greatness.
          </p>
        </div>
        <section className="img-sec">
          <div className="row">
           {
            gallery && gallery.map((item , index)=>{
              console.log(item , index)
              return (
                <div className="col-4 " key={index}>
              <div className="img-card">
                <div className="single-img">
                  <img
                    src={`${imageURl}/${item.instagram_pic}`}
                    alt={item.instagram_title}
                    className="image"
                  />
                  <div className="img-overlay">
                    <div className="text">
                      <h3>{item.instagram_title}</h3>
                      <a href={item.instagram_url}>
                        Shop Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
              )
            }) 
           } 
          
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Gallery;
