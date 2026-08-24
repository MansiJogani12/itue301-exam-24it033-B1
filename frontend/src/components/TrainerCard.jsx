function TrainerCard({
  name,
  specialization,
  available
}) {
  return (
    <div className="trainer-card">
      <h3>{name}</h3>

      <p>
        Specialization: {specialization}
      </p>

      <p>
        Status:{" "}
        <strong>
          {available
            ? "Available"
            : "Fully Booked"}
        </strong>
      </p>
    </div>
  );
}

export default TrainerCard;