
import action_types from '../actions/action_types';
import { LocalStorageService } from '../services/LocalStorageService';

const initialState = {
    query: '',
    canalTypes: {
      Youtube: LocalStorageService.get('Youtube') ? LocalStorageService.get('Youtube') : false,
      Rutube: LocalStorageService.get('Rutube') ? LocalStorageService.get('Rutube') : false,
      Dailymotion: LocalStorageService.get('Dailymotion') ? LocalStorageService.get('Dailymotion') : false
    }
};

export default function searchReducer(state = initialState, action) {
    switch(action.type) {
      case action_types.ADD_SEARCH:
        return {
            ...state,
            query: action.payload
        };
      case action_types.CHANGE_CANAL_TYPES:
        let canalTypes = {...state.canalTypes, ...action.payload}
        return {
            ...state,
            canalTypes: canalTypes
        };    
      default:
        return state;
    }
  }