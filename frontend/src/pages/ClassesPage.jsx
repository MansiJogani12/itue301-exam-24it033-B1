import {
  useContext,
  useEffect,
  useState
} from "react";

import TrainerCard from "../components/TrainerCard";

import { AuthContext } from "../context/AuthContext";

function ClassesPage() {
  const [trainers, setTrainers] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [selectedTrainer, setSelectedTrainer] =
    useState("");

  const [className, setClassName] =
    useState("");

  const [date, setDate] =
    useState("");

  const [timeSlot, setTimeSlot] =
    useState("");

  const [message, setMessage] =
    useState("");

  const { token } =
    useContext(AuthContext);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "http://localhost:5000/api/v1/trainers"
        );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
            "Failed to fetch trainers"
          );
        }

        setTrainers(data.data);

      } catch (error) {
        setError(error.message);

      } finally {
        setLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  const filteredTrainers =
    trainers.filter((trainer) =>
      trainer.specialization
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  const handleBooking = async (e) => {
    e.preventDefault();

    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/bookings",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",

            Authorization:
              `Bearer ${token}`
          },

          body: JSON.stringify({
            trainerId: selectedTrainer,
            className,
            date,
            timeSlot
          })
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        setMessage(
          data.message ||
          data.errors?.join(", ") ||
          "Booking failed"
        );

        return;
      }

      setMessage(
        "Booking created successfully!"
      );

      setSelectedTrainer("");
      setClassName("");
      setDate("");
      setTimeSlot("");

    } catch (error) {
      setMessage(
        "Could not connect to backend"
      );
    }
  };

  if (loading) {
    return (
      <h2>
        Loading trainers...
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
        FitZone Classes
      </h1>

      <h2>
        Find a Trainer
      </h2>

      <input
        type="text"
        placeholder="Search specialization"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <div>
        {filteredTrainers.map(
          (trainer) => (
            <TrainerCard
              key={trainer._id}
              name={trainer.name}
              specialization={
                trainer.specialization
              }
              available={
                trainer.available
              }
            />
          )
        )}
      </div>

      <hr />

      <h2>
        Book a Class
      </h2>

      <form onSubmit={handleBooking}>

        <label>
          Trainer
        </label>

        <br />

        <select
          value={selectedTrainer}
          onChange={(e) =>
            setSelectedTrainer(
              e.target.value
            )
          }
          required
        >
          <option value="">
            Select Trainer
          </option>

          {trainers
            .filter(
              (trainer) =>
                trainer.available
            )
            .map((trainer) => (
              <option
                key={trainer._id}
                value={trainer._id}
              >
                {trainer.name} -{" "}
                {trainer.specialization}
              </option>
            ))}
        </select>

        <br />
        <br />

        <label>
          Class Name
        </label>

        <br />

        <input
          type="text"
          value={className}
          onChange={(e) =>
            setClassName(
              e.target.value
            )
          }
          placeholder="e.g. Morning Yoga"
          required
        />

        <br />
        <br />

        <label>
          Date
        </label>

        <br />

        <input
          type="date"
          value={date}
          onChange={(e) =>
            setDate(e.target.value)
          }
          required
        />

        <br />
        <br />

        <label>
          Time Slot
        </label>

        <br />

        <select
          value={timeSlot}
          onChange={(e) =>
            setTimeSlot(
              e.target.value
            )
          }
          required
        >
          <option value="">
            Select Time
          </option>

          <option value="06:00 AM - 07:00 AM">
            06:00 AM - 07:00 AM
          </option>

          <option value="08:00 AM - 09:00 AM">
            08:00 AM - 09:00 AM
          </option>

          <option value="05:00 PM - 06:00 PM">
            05:00 PM - 06:00 PM
          </option>
        </select>

        <br />
        <br />

        <p>
          Selected Trainer:{" "}
          {
            trainers.find(
              (trainer) =>
                trainer._id ===
                selectedTrainer
            )?.name || "None"
          }
        </p>

        <p>
          Selected Time:{" "}
          {timeSlot || "None"}
        </p>

        <button type="submit">
          Book Class
        </button>

      </form>

      {message && (
        <p>
          {message}
        </p>
      )}
    </div>
  );
}

export default ClassesPage;