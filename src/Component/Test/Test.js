import React, { useState, useEffect } from 'react';
import './Test.css'

const SPLASHBASE_URL = 'http://www.splashbase.co/api/v1/images/latest';

const Test = (props) => {
    const [imgList, setImgList] = useState([]);
    const [categoryImages, setCategoryImages] = useState([]);

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentImageIdx, setCurrentImagIdx] = useState(0);

    const [category, setCategory] = useState('Select Category');


    useEffect(() => {
        fetch(SPLASHBASE_URL)
            .then(res => res.json())
            .then(
                (result) => {
                    setImgList(result.images);
                    setCategoryImages(result.images);
                    setIsLoaded(true);
                },
                (error) => {
                    setError(error);
                    setIsLoaded(true);
                    console.log(error);
                }
            )
    }, [])

    const prevSlide = () => {
        const resetToVeryBack = currentImageIdx === 0;
        const index = resetToVeryBack ? categoryImages.length - 1 : currentImageIdx - 1;
        setCurrentImagIdx(index);
    };

    const nextSlide = () => {
        const resetIndex = currentImageIdx === categoryImages.length - 1;
        const index = resetIndex ? 0 : currentImageIdx + 1;
        setCurrentImagIdx(index);
    }

    const activeImageSourcesFromState = categoryImages.slice(currentImageIdx, currentImageIdx + 3);
    const imageSourcesToDisplay = activeImageSourcesFromState.length < 3
        ? [...activeImageSourcesFromState, ...categoryImages.slice(0, 3 - activeImageSourcesFromState.length)]
        : activeImageSourcesFromState;

    const uniqueCategory = [...new Set(imgList.map(item => item.id))];
    
    
   const changeCategory=(e)=>{
       setIsLoaded(false);
        setCategory(e);
        console.log(e);
        if(e==='default'){
            setCategoryImages(imgList);
            
        }else if(e>8000){
            const i=imgList.filter(item=>item.id > 8000);
            setCategoryImages(i);
            
        }else{
            const i=imgList.filter(item=>item.id < 8000);
            setCategoryImages(i);
        }
        setIsLoaded(true);
       
    }
    console.log(categoryImages);
    return (
        !isLoaded ?
            <h1>Loading...</h1>
            :
            <div className="carousel-wrapper">
                <div className="carousel">
                    <div className="container">
                        {imageSourcesToDisplay.map((images, index) =>
                            <img key={index} className='carousel__photo' src={images.url} />

                        )}
                        <div className="text-block">
                            <p>Category:{categoryImages[currentImageIdx].id}   Name:{categoryImages[currentImageIdx].id}   Price:{categoryImages[currentImageIdx].id}</p>
                        </div>
                    </div>
                    <button className='carousel__button--next' onClick={nextSlide}></button>
                    <button className='carousel__button--prev' onClick={prevSlide}></button>
                </div>
                <div className='category-dropdown'>
                    <select id="dropdown" value={category} onChange={e => (changeCategory(e.currentTarget.value))}>
                        <option value="default" key="default">Select Category</option>
                        {uniqueCategory.map((cat) =>
                            <option value={cat} key={cat}>{cat}</option>

                        )}
                    </select>
                </div>
            </div>
    );
};

export default Test;