import axios from 'axios';
import { LocalStorageService } from './LocalStorageService';

export const searchRutubeVideo = (query, page = false) => {
    if (!LocalStorageService.get('Rutube')) {
        return new Promise((resolve, reject) => resolve(false));
    }
    let url = `https://cors-anywhere.herokuapp.com/http://rutube.ru/api/search/video/?query=${query}`;
    if (page) {
        url = `https://cors-anywhere.herokuapp.com/${page}`;
    }
    return axios.get(url);
}

export const suggestedRutubeVideosAxios = (id, page = false) => {
    let url = `https://cors-anywhere.herokuapp.com/http://rutube.ru/api/search/related/${id}`;
    if (page) {
        url = `https://cors-anywhere.herokuapp.com/${page}`;
    }
    return axios.get(url);
}
