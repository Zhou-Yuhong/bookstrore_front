
import {postRequest, postRequest_v2} from "../utils/ajax";
const  apiUrl='http://localhost:8080';

export const getBooks = (data, callback) => {
    const url = `${apiUrl}/getBooks`;
    postRequest(url, data, callback);
};

export const getBook = (id, callback) => {
    if(typeof id=='number'){
    const data = {id: id};
    const url = `${apiUrl}/getBook`;
    postRequest_v2(url, data, callback);}
    else{
        const url = `${apiUrl}/getBook`;
        postRequest_v2(url, id, callback);}


};