import { useEffect, useState } from "react";
import API from "../services/api";

export default function Workers() {
  const [workers, setWorkers] = useState([]);

useEffect(() => {
  const fetchWorkers = async () => {
    try {
      const res = await API.get("/workers");
      console.log("Workers API response:", res.data);
      // Ensure workers is always an array
      setWorkers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log(err);
      setWorkers([]); // Set to empty array on error
    }
  };
  fetchWorkers();
}, []);


  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-pink-300 justify-center items-center w-auto">
            <h1>workers</h1>
        </div>
      {workers.map(worker => (
        <div key={worker._id} className="bg-white rounded shadow p-4">
          <h3 className="font-bold">{worker.name}</h3>
          <p>Skills: {worker.skills.join(", ")}</p>
          <p>Rate: ₹{worker.hourlyRate}/hr</p>
        </div>
      ))}
    </div>
  );
}
