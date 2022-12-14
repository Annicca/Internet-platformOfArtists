export const formatdate = (str) =>{
    const date = str.split('.').reverse().join('-');
    return date;
}