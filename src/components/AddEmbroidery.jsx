import React, { useRef, useEffect, useState } from 'react'
import Navbar from '../components/Navbar';


function AddEmbroidery() {
    const canvasRef = useRef(null);
    const imageInputRef = useRef(null);
    const textInputRef = useRef(null);
    const [textColor, setTextColor] = useState('black');
    const [fontFamily, setFontFamily] = useState('Arial');
    const [backgroundImage, setBackgroundImage] = useState(
        'https://admin.digitalnawab.com/112.png'
    );
    const canvas = useRef(null);

    useEffect(() => {
        canvas.current = new fabric.Canvas(canvasRef.current);

        return () => {
            canvas.current.dispose();
            canvas.current = null;
        };
    }, []);

    const handleAddImage = () => {
        const file = imageInputRef.current.files[0];
        const reader = new FileReader();

        reader.onload = function (event) {
            const imgObj = new Image();
            imgObj.src = event.target.result;

            imgObj.onload = function () {
                fabric.Image.fromURL(imgObj.src, function (fabricImg) {
                    fabricImg.set({
                        left: 100,
                        top: 100,
                        scaleX: canvas.current.width / fabricImg.width,
                        scaleY: canvas.current.height / fabricImg.height,
                        selectable: true,
                        movable: true,
                        resizable: true,
                    });

                    canvas.current.add(fabricImg);
                    canvas.current.renderAll();
                });
            };
        };
        reader.readAsDataURL(file);
        imageInputRef.current.value = '';
    };

    const handleAddText = () => {
        const text = textInputRef.current.value;

        const textObj = new fabric.Text(text, {
            left: 100,
            top: 100,
            fontSize: 24,
            fontFamily: fontFamily,
            fill: textColor,
        });

        canvas.current.add(textObj);
        canvas.current.setActiveObject(textObj);
        canvas.current.renderAll();

        textInputRef.current.value = '';
    };

    const handleColorChange = (e) => {
        setTextColor(e.target.value);
        const activeObject = canvas.current.getActiveObject();
        if (activeObject && activeObject.type === 'text') {
            activeObject.set('fill', e.target.value);
            canvas.current.renderAll();
        }
    };

    const handleFontFamilyChange = (e) => {
        setFontFamily(e.target.value);
    };

    const handleRemoveObject = (object) => {
        canvas.current.remove(object);
        canvas.current.discardActiveObject();
        canvas.current.renderAll();
    };
    return (
        <>
            <Navbar />
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div>
                                <input type="file" ref={imageInputRef} accept="image/*" />
                                <button onClick={handleAddImage}>Add Image</button>
                            </div>
                            <div>
                                <input type="text" ref={textInputRef} />
                                <label>
                                    Font Color:
                                    <input type="color" value={textColor} onChange={handleColorChange} />
                                </label>
                                <label>
                                    Font Family:
                                    <select value={fontFamily} onChange={handleFontFamilyChange}>
                                        <option value="Arial">Arial</option>
                                        <option value="Verdana">Verdana</option>
                                        <option value="Times New Roman">Times New Roman</option>
                                        <option value="Courier New">Courier New</option>
                                    </select>
                                </label>
                                <button onClick={handleAddText}>Add Text</button>
                            </div>



                        </div>
                        <div className="col-lg-6">

                            <div>
                                <canvas
                                    ref={canvasRef}
                                    width={800}
                                    height={600}
                                    style={{ position: 'relative' }}
                                />
                            </div>
                            {backgroundImage && (
                                <img
                                    src={backgroundImage}
                                    alt="Background"
                                    style={{
                                        position: 'absolute',
                                        top: 20,
                                        left: 0,
                                        zIndex: -1,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        pointerEvents: 'none',
                                    }}
                                />
                            )}
                            <div>
                                <h3>Objects on Canvas</h3>
                                {canvas.current &&
                                    canvas.current.getObjects().map((object, index) => (
                                        <div key={index}>
                                            <span>{object.type}</span>
                                            <button onClick={() => handleRemoveObject(object)}>Remove</button>
                                        </div>
                                    ))}
                            </div>



                        </div>

                    </div>

                </div>
                <aside>

                </aside>

            </section>





        </>
    )
}

export default AddEmbroidery