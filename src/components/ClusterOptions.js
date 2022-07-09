export const ClusterOptions = ({ handleChange }) => {
  return (
    <form
      style={{
        width: "70%",
        marginLeft: "14%",
        marginTop: "15px",
        backgroundColor: "white",
        padding: "20px 1% ",
      }}

      onChange={e => handleChange(e.target.value)}
    >
      {/* TODO: gestione onClick */}
      <input
        // onClick={(e) => {console.log(e); handleChange(e.target.value)}}
        type="radio"
        value="all"
        name="clustering"
        id="all"
      />
      <label htmlFor="all"> Tutti dati </label> <br />
      <input type="radio" value="day" id="today" name="clustering" />
      <label htmlFor="today"> Oggi </label> <br />
      <input type="radio" value="2hr" id="two" name="clustering" />
      <label htmlFor="two"> Ultime 2 ore </label>
    </form>
  );
};
