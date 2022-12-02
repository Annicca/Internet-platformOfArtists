
export const handleValue = (value, url, urlSearch) =>{
    let urlData;
    if(!value){
      urlData = url;
    }
    else{
      urlData = urlSearch;
    }
    return urlData
}