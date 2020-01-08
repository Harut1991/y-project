import axios from 'axios';
import { YOUTUBE_KEY } from '../env';
import { LocalStorageService } from './LocalStorageService';

export const autoComplate = (query) => axios.get(`https://cors-anywhere.herokuapp.com/https://suggestqueries.google.com/complete/search?hl=en&ds=yt&client=youtube&hjson=t&cp=1&q=${query}&key=${YOUTUBE_KEY}&format=5&alt=json`);

export const suggestedVideos = (id, pageToken = false) => {
    let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${id}&type=video&key=${YOUTUBE_KEY}&format=5&alt=json`;
    if (pageToken) {
        url = `${url}&pageToken=${pageToken}`;
    }
    return axios.get(url);
}

export const searchVideo = (query, pageToken = false) => {
    if (!LocalStorageService.get('Youtube')) {
        return new Promise((resolve, reject) => resolve(false));
    }
    let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&key=${YOUTUBE_KEY}`;
    if (pageToken) {
        url = `${url}&pageToken=${pageToken}`;
    }
    return axios.get(url);

    return new Promise((resolve,reject) => {
        resolve(JSON.parse(`{
            "kind": "youtube#searchListResponse",
            "nextPageToken": "CAUQAA",
            "pageInfo": {
             "totalResults": 1000000,
             "resultsPerPage": 5
            },
            "items": [
             {
              "kind": "youtube#searchResult",
              "id": {
               "kind": "youtube#video",
               "videoId": "8CdcCD5V-d8"
              },
              "snippet": {
               "publishedAt": "2018-10-05T17:00:00.000Z",
               "channelId": "UC20vb-R_px4CguHzzBPhoyQ",
               "title": "Eminem - Venom",
               "description": "Listen to Venom (Music From The Motion Picture), out now: http://smarturl.it/EminemVenom http://eminem.com http://facebook.com/eminem ...",
               "thumbnails": {
                "default": {
                 "url": "https://i.ytimg.com/vi/8CdcCD5V-d8/default.jpg",
                 "width": 120,
                 "height": 90
                },
                "medium": {
                 "url": "https://i.ytimg.com/vi/8CdcCD5V-d8/mqdefault.jpg",
                 "width": 320,
                 "height": 180
                },
                "high": {
                 "url": "https://i.ytimg.com/vi/8CdcCD5V-d8/hqdefault.jpg",
                 "width": 480,
                 "height": 360
                }
               },
               "channelTitle": "EminemVEVO",
               "liveBroadcastContent": "none"
              }
             },
             {
              "kind": "youtube#searchResult",
              "id": {
               "kind": "youtube#video",
               "videoId": "_Yhyp-_hX2s"
              },
              "snippet": {
               "publishedAt": "2015-08-07T01:12:12.000Z",
               "channelId": "UCstaTFTqZAC_OqfAq_JF6vA",
               "title": "Eminem - Lose Yourself [HD]",
               "description": "feat. Eminem from the movie 8 MILE No copyright infringement intended. All contents belong to its rightful owners. This is for entertainment purposes only.",
               "thumbnails": {
                "default": {
                 "url": "https://i.ytimg.com/vi/_Yhyp-_hX2s/default.jpg",
                 "width": 120,
                 "height": 90
                },
                "medium": {
                 "url": "https://i.ytimg.com/vi/_Yhyp-_hX2s/mqdefault.jpg",
                 "width": 320,
                 "height": 180
                },
                "high": {
                 "url": "https://i.ytimg.com/vi/_Yhyp-_hX2s/hqdefault.jpg",
                 "width": 480,
                 "height": 360
                }
               },
               "channelTitle": "msvogue23",
               "liveBroadcastContent": "none"
              }
             },
             {
              "kind": "youtube#searchResult",
              "id": {
               "kind": "youtube#video",
               "videoId": "XbGs_qK2PQA"
              },
              "snippet": {
               "publishedAt": "2013-11-27T16:50:00.000Z",
               "channelId": "UC20vb-R_px4CguHzzBPhoyQ",
               "title": "Eminem - Rap God (Explicit) [Official Video]",
               "description": "Download Eminem's 'MMLP2' Album on iTunes now:http://smarturl.it/MMLP2 Credits below Video Director: Rich Lee Video Producer: Justin Diener Video ...",
               "thumbnails": {
                "default": {
                 "url": "https://i.ytimg.com/vi/XbGs_qK2PQA/default.jpg",
                 "width": 120,
                 "height": 90
                },
                "medium": {
                 "url": "https://i.ytimg.com/vi/XbGs_qK2PQA/mqdefault.jpg",
                 "width": 320,
                 "height": 180
                },
                "high": {
                 "url": "https://i.ytimg.com/vi/XbGs_qK2PQA/hqdefault.jpg",
                 "width": 480,
                 "height": 360
                }
               },
               "channelTitle": "EminemVEVO",
               "liveBroadcastContent": "none"
              }
             },
             {
              "kind": "youtube#searchResult",
              "id": {
               "kind": "youtube#video",
               "videoId": "YVkUvmDQ3HY"
              },
              "snippet": {
               "publishedAt": "2009-06-16T23:00:29.000Z",
               "channelId": "UC20vb-R_px4CguHzzBPhoyQ",
               "title": "Eminem - Without Me (Official Video)",
               "description": "iTunes: http://smarturl.it/WithoutMe Amazon: http://smarturl.it/WithoutMeAmz Google Play: http://smarturl.it/WithoutMeGP Playlist Best of Eminem: ...",
               "thumbnails": {
                "default": {
                 "url": "https://i.ytimg.com/vi/YVkUvmDQ3HY/default.jpg",
                 "width": 120,
                 "height": 90
                },
                "medium": {
                 "url": "https://i.ytimg.com/vi/YVkUvmDQ3HY/mqdefault.jpg",
                 "width": 320,
                 "height": 180
                },
                "high": {
                 "url": "https://i.ytimg.com/vi/YVkUvmDQ3HY/hqdefault.jpg",
                 "width": 480,
                 "height": 360
                }
               },
               "channelTitle": "EminemVEVO",
               "liveBroadcastContent": "none"
              }
             },
             {
              "kind": "youtube#searchResult",
              "id": {
               "kind": "youtube#video",
               "videoId": "j5-yKhDd64s"
              },
              "snippet": {
               "publishedAt": "2010-06-05T05:02:39.000Z",
               "channelId": "UC20vb-R_px4CguHzzBPhoyQ",
               "title": "Eminem - Not Afraid (Official Video)",
               "description": "Music video by Eminem performing Not Afraid. (C) 2010 Aftermath Records #VEVOCertified on September 11, 2010.http://www.vevo.com/certified ...",
               "thumbnails": {
                "default": {
                 "url": "https://i.ytimg.com/vi/j5-yKhDd64s/default.jpg",
                 "width": 120,
                 "height": 90
                },
                "medium": {
                 "url": "https://i.ytimg.com/vi/j5-yKhDd64s/mqdefault.jpg",
                 "width": 320,
                 "height": 180
                },
                "high": {
                 "url": "https://i.ytimg.com/vi/j5-yKhDd64s/hqdefault.jpg",
                 "width": 480,
                 "height": 360
                }
               },
               "channelTitle": "EminemVEVO",
               "liveBroadcastContent": "none"
              }
             }
            ]
           }`))
    })
}
