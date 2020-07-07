//const proxyUrl = 'https://polar-scrubland-01188.herokuapp.com/'
const apikey="cD9AL9q8HVGkWtSShJSZ0QhXNqv5WG3bfuo0fUEJOFI";
const count=10;
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let ready= false;
let imagesLoaded=0;
let totalImages=0;

let photosArray=[];

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}`;

//check if all images are loaded

function imageLoaded()
{
   imagesLoaded++;
   if(imagesLoaded === totalImages)
   {
       ready=true;

   }
}


// helper function 

function setAttributes(element,attributes)
{
    for (const key in attributes)
    {
        element.setAttribute(key,attributes[key]);
    }
}

function displayPhotos()
{
   imagesLoaded =0;
   totalImages = photosArray.length;
   photosArray.forEach((photo)=> {
       //create a element 
       const item = document.createElement('a');
   ;
        setAttributes(item,{href: photo.links.html, target:'_blank'});
       //create image
       const img = document.createElement('img');
       setAttributes(img,{src: photo.urls.regular, alt:photo.alt_description, title:photo.alt_description});
       img.addEventListener('load',imageLoaded);
    

       //put <img> inside <a> then put them in container

       item.appendChild(img);
       imageContainer.appendChild(item);
     
        

   })
}


//get photos 
async function getPhotos()
{
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        console.log(photosArray);
        displayPhotos();
        

    }
    catch{

    }
}


//scroll event

window.addEventListener('scroll',()=> { 
    //console.log(window.scrollY);
    //console.log(document.body.offsetHeight);
    if(window.innerHeight+ window.scrollY >= document.body.offsetHeight -1000 && ready)
    {
        ready=false;
        getPhotos();

    }
})


getPhotos();