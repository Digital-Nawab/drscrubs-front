import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function SizeGuid() {

    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = (index) => {
        setActiveTab(index);
    };


    return (
        <>


            <Navbar />
            <main className="main__content_wrapper">
                <section className="breadcrumb__section breadcrumb__about_bg">
                    <div className="container">
                        <div className="row row-cols-1">
                            <div className="col">
                                <div className="breadcrumb__content text-center">
                                    <h1 className="breadcrumb__content--title text-white mb-25">
                                        Size Guide
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


            </main>
            <section className="product__section section--padding pt-0 mt-5">
                <div className="container-fluid">
                    <div className="section__heading text-center mb-35">
                        <h2 className="section__heading--maintitle">Scrub and Lab Coat Size Charts</h2>
                    </div>
                    <ul className="product__tab--one product__tab--primary__btn d-flex justify-content-center mb-50">
                        <li



                            className={` ${activeTab === 1 ? "product__tab--primary__btn__list active" : "product__tab--primary__btn__list "
                                }`}
                            data-toggle="tab"
                            data-target="#featured"
                            onClick={() => handleTabClick(1)}
                        >
                            Women's Size{" "}
                        </li>
                        <li
                            className='vl'
                            data-toggle="tab"
                            data-target="#featured"

                        >
                        </li>
                        <li
                            className={`  ${activeTab === 2 ? "product__tab--primary__btn__list active" : "product__tab--primary__btn__list"
                                }`}
                            data-toggle="tab"
                            data-target="#trending"
                            onClick={() => handleTabClick(2)}
                        >
                            Men's Size{" "}
                        </li>

                    </ul>
                    <div className="tab_content">
                        <div id="featured" className={`${activeTab === 1 ? 'tab_pane active show' : 'tab_pane'}`}>
                            {
                                activeTab == 1 && (<div className="tab-content container" id="women">
                                    <div
                                        className="gender-container row"
                                        style={{ background: "#f0f1f1", display: "block !important" }}
                                    >
                                        <h3 className="text-center">Women's Size Guide</h3>
                                        <p style={{textAlign:'center',marginTop:"10px"}}>All body measurements are in inches</p>
                                        <div style={{ background: "#FFF" }} className="light uppercase">
                                            {" "}
                                            <div className="widget block block-static-block">
                                                <div
                                                    data-content-type="html"
                                                    data-appearance="default"
                                                    data-element="main"
                                                    data-decoded="true"
                                                >
                                                    <div className="container" id="sizeguide">
                                                        <div className="row nopadding">
                                                            <div className="col-12">
                                                                <p style={{ textAlign: "center", fontSize: 12 }}>
                                                                    Body Measurements In Inches
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="row nopadding">
                                                            <div className="col-12">
                                                                <div className="table-responsive">
                                                                    <table
                                                                        className="measurement-sizeguide table table-striped table-hover borderless"
                                                                        cellSpacing={0}
                                                                        cellPadding={0}
                                                                    >
                                                                        <tbody>
                                                                            <tr>
                                                                                <th colSpan={2}>Size</th>
                                                                                <th>Bust</th>
                                                                                <th>Waist</th>
                                                                                <th>Hip</th>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>XXS</td>
                                                                                <td>00</td>
                                                                                <td>31 1/2</td>
                                                                                <td>24 1/2</td>
                                                                                <td>34 1/2</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td rowSpan={2}>XS</td>
                                                                                <td>0</td>
                                                                                <td>32 1/2</td>
                                                                                <td>25 1/2</td>
                                                                                <td>35 1/2</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>2</td>
                                                                                <td>33 1/2</td>
                                                                                <td>26 1/2</td>
                                                                                <td>36 1/2</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td rowSpan={2}>S</td>
                                                                                <td>4</td>
                                                                                <td>34 1/2</td>
                                                                                <td>27 1/2</td>
                                                                                <td>37 1/2</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>6</td>
                                                                                <td>35 1/2</td>
                                                                                <td>28 1/2</td>
                                                                                <td>38 1/2</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td rowSpan={2}>M</td>
                                                                                <td>8</td>
                                                                                <td>36 1/2</td>
                                                                                <td>29 1/2</td>
                                                                                <td>39 1/2</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>10</td>
                                                                                <td>37 1/2</td>
                                                                                <td>30 1/2</td>
                                                                                <td>40 1/2</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td rowSpan={2}>L</td>
                                                                                <td>12</td>
                                                                                <td>39</td>
                                                                                <td>32</td>
                                                                                <td>42</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>14</td>
                                                                                <td>40 1/2</td>
                                                                                <td>33 1/2</td>
                                                                                <td>43 1/2</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td rowSpan={2}>XL</td>
                                                                                <td>16</td>
                                                                                <td>42 1/2</td>
                                                                                <td>35 1/2</td>
                                                                                <td>45 1/2</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>18</td>
                                                                                <td>44 1/2</td>
                                                                                <td>37 1/2</td>
                                                                                <td>47 1/2</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td rowSpan={2}>XXL</td>
                                                                                <td>18W</td>
                                                                                <td>45</td>
                                                                                <td>41</td>
                                                                                <td>47</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>20W</td>
                                                                                <td>47</td>
                                                                                <td>43</td>
                                                                                <td>49</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td rowSpan={2}>XXXL</td>
                                                                                <td>22W</td>
                                                                                <td>49</td>
                                                                                <td>45</td>
                                                                                <td>51</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>24W</td>
                                                                                <td>51</td>
                                                                                <td>47</td>
                                                                                <td>53</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p style={{ textAlign: "center", fontSize: 12 }}>
                                                            *All sizes are approximate.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 mt-5" />
                                    <div
                                        className="col-12 chart pt-md-3 pb-md-5 pr-md-5 pl-md-5"
                                        style={{ background: "#F0F1F1" }}
                                    >
                                        <p className='text-center'>International Conversions</p>
                                        <div style={{ background: "#FFF" }} className="light uppercase">
                                            <div className="table-responsive">
                                                <table
                                                    cellSpacing={0}
                                                    cellPadding={0}
                                                    className="table table-striped table-hover borderless mb-0"
                                                >
                                                    <tbody>
                                                        <tr>
                                                            <th>US</th>
                                                            <td>00</td>
                                                            <td>0</td>
                                                            <td>2</td>
                                                            <td>4</td>
                                                            <td>6</td>
                                                            <td>8</td>
                                                            <td>10</td>
                                                            <td>12</td>
                                                            <td>14</td>
                                                            <td>16</td>
                                                        </tr>
                                                        <tr>
                                                            <th>UK</th>
                                                            <td>0</td>
                                                            <td>2</td>
                                                            <td>4</td>
                                                            <td>6</td>
                                                            <td>8</td>
                                                            <td>10</td>
                                                            <td>12</td>
                                                            <td>14</td>
                                                            <td>16</td>
                                                            <td>18</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Europe</th>
                                                            <td>28</td>
                                                            <td>30</td>
                                                            <td>32</td>
                                                            <td>34</td>
                                                            <td>36</td>
                                                            <td>38</td>
                                                            <td>40</td>
                                                            <td>42</td>
                                                            <td>44</td>
                                                            <td>46</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Italy</th>
                                                            <td>32</td>
                                                            <td>34</td>
                                                            <td>36</td>
                                                            <td>38</td>
                                                            <td>40</td>
                                                            <td>42</td>
                                                            <td>44</td>
                                                            <td>46</td>
                                                            <td>48</td>
                                                            <td>50</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Austrailia</th>
                                                            <td>2</td>
                                                            <td>4</td>
                                                            <td>6</td>
                                                            <td>8</td>
                                                            <td>10</td>
                                                            <td>12</td>
                                                            <td>14</td>
                                                            <td>16</td>
                                                            <td>18</td>
                                                            <td>20</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Japan</th>
                                                            <td>1</td>
                                                            <td>3</td>
                                                            <td>5</td>
                                                            <td>7</td>
                                                            <td>9</td>
                                                            <td>11</td>
                                                            <td>13</td>
                                                            <td>15</td>
                                                            <td>17</td>
                                                            <td>19</td>
                                                        </tr>
                                                        <tr>
                                                            <th>France</th>
                                                            <td>30</td>
                                                            <td>32</td>
                                                            <td>34</td>
                                                            <td>36</td>
                                                            <td>38</td>
                                                            <td>40</td>
                                                            <td>42</td>
                                                            <td>44</td>
                                                            <td>46</td>
                                                            <td>48</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 mt-5" />

                                </div>)
                            }




                        </div>
                        <div id="featured" className={` ${activeTab === 2 ? 'tab_pane active show' : 'tab_pane'}`}>
                            {
                                activeTab == 2 && (<div className="tab-content container" id="women">
                                    <div
                                        className="gender-container row"
                                        style={{ background: "#f0f1f1", display: "block !important" }}
                                    >
                                        <h3 className="text-center">Men's Size Guide</h3>
                                        <p style={{textAlign:"center",margin:"10px"}}>All body measurements are in inches</p>
                                        <div style={{ background: "#FFF" }} className="light uppercase">
                                            {" "}
                                            <div className="widget block block-static-block">
                                                <div
                                                    data-content-type="html"
                                                    data-appearance="default"
                                                    data-element="main"
                                                    data-decoded="true"
                                                >
                                                    <div className="container" id="sizeguide">
                                                        <div className="row nopadding">
                                                            <div className="col-12">
                                                                <p style={{ textAlign: "center", fontSize: 12 }}>
                                                                    Body Measurements In Inches
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="row nopadding">
                                                            <div className="col-12">
                                                                <div className="table-responsive">
                                                                    <table
                                                                        className="measurement-sizeguide table table-striped table-hover borderless"
                                                                        cellSpacing={0}
                                                                        cellPadding={0}
                                                                    >
                                                                        <tbody>
                                                                            <tr>
                                                                                <th colSpan={2}>Size</th>
                                                                                <th>Bust</th>
                                                                                <th>Waist</th>
                                                                                <th>Hip</th>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>XXS</td>
                                                                                <td>00</td>
                                                                                <td>31 1/2</td>
                                                                                <td>24 1/2</td>
                                                                                <td>34 1/2</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td rowSpan={2}>XS</td>
                                                                                <td>0</td>
                                                                                <td>32 1/2</td>
                                                                                <td>25 1/2</td>
                                                                                <td>35 1/2</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>2</td>
                                                                                <td>33 1/2</td>
                                                                                <td>26 1/2</td>
                                                                                <td>36 1/2</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td rowSpan={2}>S</td>
                                                                                <td>4</td>
                                                                                <td>34 1/2</td>
                                                                                <td>27 1/2</td>
                                                                                <td>37 1/2</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>6</td>
                                                                                <td>35 1/2</td>
                                                                                <td>28 1/2</td>
                                                                                <td>38 1/2</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td rowSpan={2}>M</td>
                                                                                <td>8</td>
                                                                                <td>36 1/2</td>
                                                                                <td>29 1/2</td>
                                                                                <td>39 1/2</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>10</td>
                                                                                <td>37 1/2</td>
                                                                                <td>30 1/2</td>
                                                                                <td>40 1/2</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td rowSpan={2}>L</td>
                                                                                <td>12</td>
                                                                                <td>39</td>
                                                                                <td>32</td>
                                                                                <td>42</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>14</td>
                                                                                <td>40 1/2</td>
                                                                                <td>33 1/2</td>
                                                                                <td>43 1/2</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td rowSpan={2}>XL</td>
                                                                                <td>16</td>
                                                                                <td>42 1/2</td>
                                                                                <td>35 1/2</td>
                                                                                <td>45 1/2</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>18</td>
                                                                                <td>44 1/2</td>
                                                                                <td>37 1/2</td>
                                                                                <td>47 1/2</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td rowSpan={2}>XXL</td>
                                                                                <td>18W</td>
                                                                                <td>45</td>
                                                                                <td>41</td>
                                                                                <td>47</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>20W</td>
                                                                                <td>47</td>
                                                                                <td>43</td>
                                                                                <td>49</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td rowSpan={2}>XXXL</td>
                                                                                <td>22W</td>
                                                                                <td>49</td>
                                                                                <td>45</td>
                                                                                <td>51</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>24W</td>
                                                                                <td>51</td>
                                                                                <td>47</td>
                                                                                <td>53</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p style={{ textAlign: "center", fontSize: 12 }}>
                                                            *All sizes are approximate.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 mt-5" />
                                    <div
                                        className="col-12 chart pt-md-3 pb-md-5 pr-md-5 pl-md-5"
                                        style={{ background: "#F0F1F1" }}
                                    >
                                        <p style={{textAlign:"center"}}>International Conversions</p>
                                        <div style={{ background: "#FFF" }} className="light uppercase">
                                            <div className="table-responsive">
                                                <table
                                                    cellSpacing={0}
                                                    cellPadding={0}
                                                    className="table table-striped table-hover borderless mb-0"
                                                >
                                                    <tbody>
                                                        <tr>
                                                            <th>US</th>
                                                            <td>00</td>
                                                            <td>0</td>
                                                            <td>2</td>
                                                            <td>4</td>
                                                            <td>6</td>
                                                            <td>8</td>
                                                            <td>10</td>
                                                            <td>12</td>
                                                            <td>14</td>
                                                            <td>16</td>
                                                        </tr>
                                                        <tr>
                                                            <th>UK</th>
                                                            <td>0</td>
                                                            <td>2</td>
                                                            <td>4</td>
                                                            <td>6</td>
                                                            <td>8</td>
                                                            <td>10</td>
                                                            <td>12</td>
                                                            <td>14</td>
                                                            <td>16</td>
                                                            <td>18</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Europe</th>
                                                            <td>28</td>
                                                            <td>30</td>
                                                            <td>32</td>
                                                            <td>34</td>
                                                            <td>36</td>
                                                            <td>38</td>
                                                            <td>40</td>
                                                            <td>42</td>
                                                            <td>44</td>
                                                            <td>46</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Italy</th>
                                                            <td>32</td>
                                                            <td>34</td>
                                                            <td>36</td>
                                                            <td>38</td>
                                                            <td>40</td>
                                                            <td>42</td>
                                                            <td>44</td>
                                                            <td>46</td>
                                                            <td>48</td>
                                                            <td>50</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Austrailia</th>
                                                            <td>2</td>
                                                            <td>4</td>
                                                            <td>6</td>
                                                            <td>8</td>
                                                            <td>10</td>
                                                            <td>12</td>
                                                            <td>14</td>
                                                            <td>16</td>
                                                            <td>18</td>
                                                            <td>20</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Japan</th>
                                                            <td>1</td>
                                                            <td>3</td>
                                                            <td>5</td>
                                                            <td>7</td>
                                                            <td>9</td>
                                                            <td>11</td>
                                                            <td>13</td>
                                                            <td>15</td>
                                                            <td>17</td>
                                                            <td>19</td>
                                                        </tr>
                                                        <tr>
                                                            <th>France</th>
                                                            <td>30</td>
                                                            <td>32</td>
                                                            <td>34</td>
                                                            <td>36</td>
                                                            <td>38</td>
                                                            <td>40</td>
                                                            <td>42</td>
                                                            <td>44</td>
                                                            <td>46</td>
                                                            <td>48</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 mt-5" />
                                    <div className="col-12">
                                        {/* <p className="uppercase light letter-spacing" style={{ fontSize: 15 }}>
                                            {" "}
                                            How to measure yourself{" "}
                                        </p> */}
                                    </div>
                                    {/* <div className="col-12 text-center">
                                        {" "}
                                        <img
                                            src="https://www.medelita.com/media/images/18/size-guide-women.jpg?v6"
                                            border={0}
                                            alt="women's measurement guide"
                                        />{" "}
                                    </div>
                                    <div className="col-12 mt-5 text-center hidden">
                                        {" "}
                                        <a href="https://www.medelita.com/home-try-on.html">
                                            <img
                                                src="https://www.medelita.com/media/images/18/size-guide-free-shipping.png"
                                                border={0}
                                                alt="free shipping"
                                            />
                                        </a>{" "}
                                    </div> */}
                                </div>)
                            }




                        </div>


                    </div>
                </div>
            </section>
            <Footer />











        </>
    )
}

export default SizeGuid