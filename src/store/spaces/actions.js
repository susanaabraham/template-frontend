import { apiUrl, DEFAULT_PAGINATION_LIMIT } from "../../config/constants";
import axios from "axios";

export const FETCH_SPACES_SUCCESS = "FETCH_SPACES_SUCCESS";
export const SPACE_DETAILS_FETCHED = "SPACE_DETAILS_FETCHED";

export const fetchSpacesSuccess = (spaces) => ({
  type: FETCH_SPACES_SUCCESS,
  payload: spaces,
});

const spaceDetailsFetched = (space) => ({
  type: SPACE_DETAILS_FETCHED,
  payload: space,
});

export const fetchSpaces = () => {
  return async (dispatch, getState) => {
    try {
      const spacesCount = getState().spaces.allSpaces.length;
      const response = await axios.get(
        `${apiUrl}/spaces?limit=${DEFAULT_PAGINATION_LIMIT}&offset=${spacesCount}`
      );

      console.log(response.data);
      dispatch(fetchSpacesSuccess(response.data.spaces.rows));
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const fetchSpaceById = (id) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`${apiUrl}/spaces/${id}`);
      console.log(response);
      dispatch(spaceDetailsFetched(response.data.space));
    } catch (e) {
      console.log(e);
    }
  };
};

// 1. its two function because of the thunk
// 2. we have an API call in this function
// 3. Instead of asserting on a return, we have to do so on a function call (dispatch).