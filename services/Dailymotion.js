import axios from 'axios';
import { LocalStorageService } from './LocalStorageService';

export const searchDailymotionVideo = (query, page = false) => {
    if (!LocalStorageService.get('Dailymotion')) {
        return new Promise((resolve, reject) => resolve(false));
    }
    let url = `https://cors-anywhere.herokuapp.com/https://api.dailymotion.com/videos?search=${query}&fields=id%2Cdescription%2Ctitle%2Cthumbnail_1080_url`;
    if (page) {
        url = `https://cors-anywhere.herokuapp.com/${url}&page=${page}`;
    }
    return axios.get(url);
}
