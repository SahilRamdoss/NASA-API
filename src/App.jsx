import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import placeholderImg from './assets/Placeholder.png';

function App() {

  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [loading,setLoading] = useState(true);

  const apiKey = "";

  useEffect(() => async function () {
    const datePicker = document.getElementById("Photo-Date");

    const currentDate = new Date().toISOString().split('T')[0];;

    datePicker.value = currentDate;

    setLoading(true);
    try{
      await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${currentDate}`, {
      method: 'GET'
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setDescription(data.explanation);
        setImgUrl(data.url);
      })
    }catch(err){
      console.log(err);
    }finally{
      setLoading(false);
    }
  }, [])

  const handleChange = async function (e) {
    const currentDate = e.target.value;

    setLoading(true);
    try {
      await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${currentDate}`, {
      method: 'GET'
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setDescription(data.explanation);
        setImgUrl(data.url);
      })
    } catch (err) {
      console.log(err);
    }finally{
      setLoading(false);
    }

  }



  return (
    <>

      <h1><u>PHOTO OF THE DAY</u></h1>
      <br />
      <br />
      <div id="wrapper">
        <div id="Container">
          <div id="Photo_Container">
            {imgUrl == "" || loading ? <img src={placeholderImg} alt="Missing Image" Id="ImagePlaceholder"/> : <img src={imgUrl} id="Image" alt="No Image" />}
          </div>
          <div style={{ color: "black", fontFamily: "monospace", marginTop: "10px" }}>
            Date taken: <input onChange={(e) => handleChange(e)} type="date" id="Photo-Date" />
          </div>
        </div>
        <div id="Description">
          {description}
        </div>
      </div>
    </>
  )
}

export default App
