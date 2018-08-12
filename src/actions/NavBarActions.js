import axios from 'axios'
import consts from '../consts'
import { CATEGORIES_FETCHED } from './ActionTypes'

export const getCategories = () => dispatch => (
    axios.get(`${consts.API_URL}/categories`, { headers: { Authorization: "b2OXKhyvbKSbDktxm7DT24DPBNNf9PMS" } })
        .then((response) => dispatch({
            type: CATEGORIES_FETCHED,
            payload: response.data.categories
        }))
)
