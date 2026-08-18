import { useEffect, useState } from "react";
import API from "../services/api";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/api/doctors/")
      .then((response) => {
        console.log("Doctors:", response.data);
        console.log("First image:", response.data[0]?.image);

        setDoctors(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container py-5">

      <h2 className="text-center mb-5">
        Our Doctors
      </h2>

      {loading ? (
        <p className="text-center">
          Loading doctors...
        </p>
      ) : doctors.length === 0 ? (
        <p className="text-center">
          No doctors found.
        </p>
      ) : (
        <div className="row">

          {doctors.map((doctor) => (
            <div
              className="col-md-6 col-lg-3 mb-4"
              key={doctor.id}
            >

              <div className="card shadow h-100">

                <img
                  src={`https://medicare-hospital-zauc.onrender.com${doctor.image}`}
                  className="card-img-top"
                  alt={doctor.name}
                  style={{
                    height: "250px",
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    console.log(
                      "Image failed:",
                      `https://medicare-hospital-zauc.onrender.com${doctor.image}`
                    );
                  }}
                />

                <div className="card-body text-center">

                  <h5>{doctor.name}</h5>

                  <p>
                    <strong>Department:</strong>{" "}
                    {doctor.department}
                  </p>

                  <p>
                    <strong>Qualification:</strong>{" "}
                    {doctor.qualification}
                  </p>

                  <p>
                    <strong>Experience:</strong>{" "}
                    {doctor.experience} years
                  </p>

                </div>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Doctors;