// Import the schema
import Reservations from '../models/reservationTableRequest.js'

// Define the async function
const getDataByEmail = async (req, res) => {
  const email = req.query.email;

  try {
    // Query the database to find all data matching the provided email
    const userData = await Reservations.find({ email: email });

    // Send the response with the found data
    console.log(userData)
    res.status(200).json(userData);
  } catch (error) {
    // Handle any errors    
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
};

// Export the function
export default getDataByEmail;
