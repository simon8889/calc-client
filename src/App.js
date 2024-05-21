import React, { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';

const App = () => {
    const [superavit, setSuperavit] = useState({
        "superavit": "No has calculado el superavit del consumidor",
        "image_url": ""
    });
    
    const [ecuations, setEcuations] = useState({
        "demand": "",
        "offer": ""
    });
    
    const handleCalc = async (e) => {
        try {
            console.log(ecuations);
            const apiResult = await axios.post("https://old-erica-simon-j-bbe8e266.koyeb.app/calc/", ecuations);
            setSuperavit(apiResult.data);
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    };
    
    const handleDelete = () => {
        setSuperavit({ "superavit": "No has calculado el superavit del consumidor", "image_url": "" });
        setEcuations({
            "demand": "",
            "offer": ""
        });
    };
    
    useEffect(() => console.log(superavit), [superavit])
     
    

    return (
        <div className='app'>
            <h1>Calcula el superavit del consumidor</h1>
            <div className='app__inputs'>
                <label htmlFor="ecuacionDemanda">Ecuación demanda:</label>
                <input id='ecuacionDemanda' type='text' value={ecuations.demand} onChange={(e) => setEcuations({...ecuations, "demand": e.target.value})}/>
                <label htmlFor="ecuacionOferta">Ecuación oferta:</label>
                <input id='ecuacionOferta' type='text' value={ecuations.offer} onChange={(e) => setEcuations({...ecuations, "offer": e.target.value})}/>
                <button onClick={handleCalc}>Calcular</button>
                <button onClick={handleDelete}>Borrar</button>
            </div>
            <div className='app__results'>
                <p>Superavit del consumidor: {superavit.superavit === "No has calculado el superavit del consumidor" ? "" : "$"}{superavit.superavit}</p>
                {superavit.image_url && <img src={`${superavit.image_url}?${new Date().getTime()}`} alt="Gráfica de oferta y demanda" />}
            </div>
            <div className='app__names'>
                Por:
                <br />
                Maria Camila Rodriguez
                <br />
                Simon Jimenez 
            </div>
        </div>
    );
};

export default App;
