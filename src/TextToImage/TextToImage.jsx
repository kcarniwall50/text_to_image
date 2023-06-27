import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loader from '../utils/Loader/Loader';

const url = process.env.REACT_APP_URL

const TextToImage = () => {
  const [text, setText] = useState()
  const [getImageText, setGetImageText] = useState()
  const [imageURL, setImageURL] = useState()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=>{

    const imageApi = async()=>{
      const encodedParams = new URLSearchParams();
      encodedParams.set('text', getImageText);
      
      const options = {
        method: 'POST',
        url: url,
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'X-RapidAPI-Key': process.env.REACT_APP_X_RapidAPI_Key,
          'X-RapidAPI-Host':process.env.REACT_APP_X_RapidAPI_Host
        },
        data: encodedParams,
      };
      
      try {
        setIsLoading(true)
        const response = await axios.request(options);
        setIsLoading(false)
        setImageURL(response.data.url)
        // console.log(response.data);
        if(response.data.error)
        return alert(response.data.error)

        // console.log(response);
      
      } catch (error) {
        setIsLoading(false)
        // console.error(error);
        if(error.response.status===429)
      { return alert(error.response.data.message)}

        alert(error.error)
      }
    }

   imageApi();

  },[getImageText])


  const generateImage = ()=>{
    if(!text)
    {
      return alert("Please give some texts")
    }
      setGetImageText(text)
  }

  

  return (
    <>
    {isLoading && <Loader/>}
    <div>

      <h2>Generate Image from Text</h2>

      <div>
        <textarea
        placeholder='describe image scenario'
        onChange={(e)=>{setText(e.target.value)}}
        required
        rows={4.2}
        cols={35}
        style={{padding:'0.5rem 0.7rem'}}
        >

        </textarea>
      </div>

      <div>
        <button onClick={generateImage} > get image </button>
      </div>

      <div style={{ width:'95%',height:'100%',  margin:'0.6rem auto'}} >
        <img
        src={imageURL}  alt="imge" 
        style={{width:'70vw', height:'60vh'}}
        />

      </div>
      
    </div>
    </>
  )
}

export default TextToImage
