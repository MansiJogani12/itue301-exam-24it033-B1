import {
  useContext,
  useEffect,
  useState
} from "react";

import {
  AuthContext
} from "../context/AuthContext";

function MyBookingsPage() {
  const [bookings, setBookings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const { token } =
    useContext(AuthContext);

  useEffect(() => {
    const fetchBookings =
      async () => {
        try {
          const response =
            await fetch(
              "http://localhost:5000/api/v1/bookings/my",
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }
            );

          const data =
            await response.json();

          if (!response.ok) {
            throw new Error(
              data.message ||
              "Failed to load bookings"
            );
          }

          setBookings(data.data);

        } catch (error) {
          setError(
            error.message
          );

        } finally {
          setLoading(false);
        }
      };

    fetchBookings();
  }, [token]);

  if (loading) {
    return (
      <h2>
        Loading bookings...
      </h2>
    );
  }

  if (error) {
    return (
      <h2>
        Error: {error}
      </h2>
    );
  }

  return (
    <div>
      <h1>
        My Bookings
      </h1>

      {bookings.length === 0 && (
        <p>
          No bookings found.
        </p>
      )}

      {bookings.map(
        (booking) => (
          <div
            key={booking._id}
          >
            <h3>
              {booking.className}
            </h3>

            <p>
              Trainer:{" "}
              {booking.trainerId?.name}
            </p>

            <p>
              Specialization:{" "}
              {
                booking.trainerId
                  ?.specialization
              }
            </p>

            <p>
              Member:{" "}
              {booking.memberId?.name}
            </p>

            <p>
              Date:{" "}
              {booking.date}
            </p>

            <p>
              Time:{" "}
              {booking.timeSlot}
            </p>

            <p>
              Status:{" "}
              {booking.status}
            </p>

            <hr />
          </div>
        )
      )}
    </div>
  );
}

export default MyBookingsPage;