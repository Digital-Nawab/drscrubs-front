import React, {useState, useEffect} from 'react'
import Navbar from './Navbar';
import Footer from './Footer';
import  './Testimonial.css';
import BassURl from '../Api/Api';
import imageURl from '../Api/ImageUrl';
import axios from 'axios';

const Testimonial = () => {
    const [clientData, setClientData] = useState([]);
    useEffect(() => {
        axios.get(`${BassURl}/all-testimonial`).then((res) => {
            setClientData(res.data.data);
  
        });
  
    }, []);

    //console.log(clientData);
    return (
        <>
            <Navbar/>
            <main className="main__content_wrapper">
                <section className="breadcrumb__section breadcrumb__about_bg">
                    <div className="container">
                        <div className="row row-cols-1">
                        <div className="col">
                            <div className="breadcrumb__content text-center">
                            <h1 className="breadcrumb__content--title text-white mb-25">
                                Testimonial
                            </h1>
                            </div>
                        </div>
                        </div>
                    </div>
                </section>
                <section className="testimonial-section">
                    <div className="container">
                        <div class="row">
                            {clientData.map((item, key) => (
                                <div className='col-md-6'  key={key + 1}>
                                    <div className="task" draggable="true">
                                        <div className='row'>
                                            <div className='col-md-4'>
                                                <img src={`${imageURl}/${item?.image}`} width="100%"  alt=""/>
                                            </div>
                                            <div className='col-md-8'>
                                                <h3>{item?.name}</h3>
                                                <h4>{item?.designation}</h4>
                                                <p>
                                                {item?.message}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer/>
        </>
    )
}

export default Testimonial;