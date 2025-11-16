export const UserCard = ({ feed, handleSendRequest = () => {} }) => {
  const { firstName, gender, about, age, photoUrl, lastName, _id } = feed;
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={photoUrl} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>
        <p>Gender: {gender}</p>
        <p>About: {about}</p>
        <p>Age: {age}</p>
        <div className="card-actions justify-center ">
          <button
            className="btn btn-primary mr-2"
            onClick={() => handleSendRequest(_id, "ignored")}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest(_id, "interested")}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};
