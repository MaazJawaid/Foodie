import axios from 'axios';
import { fetchSeatsStart, fetchSeatsSuccess, fetchSeatsFailure } from '../redux/tableSlicer/tableSlice';
import { useDispatch } from 'react-redux';

const useFetchSeats = () => {
  const dispatch = useDispatch();
  
  const fetchSeats = async () => {
    dispatch(fetchSeatsStart());
    try {
      const response = await axios.get('http://localhost:3000/get/table/items/all');
      dispatch(fetchSeatsSuccess(response.data));
    } catch (error) {
      dispatch(fetchSeatsFailure(error.message));
    }
  };

  return fetchSeats; // Return the function from the custom hook
};

export default useFetchSeats;
