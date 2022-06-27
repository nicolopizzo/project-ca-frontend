export const Legend = () => {
  return (
    <div
      style={{
        backgroundColor: "white",
        width: "70%",
        margin: "20px auto",
        padding: "10px",
        boxShadow: "0px 0px 10px #000000",
      }}
    >
      <div style={{fontWeight: 'bold', fontSize: '18px'}}>Legenda</div>
      <LegendElement color="#754E23" text="0" />
      <LegendElement color="#FFC180" text="1 - 19" />
      <LegendElement color="#C2894D" text="20 - 39" />
      <LegendElement color="#175C75" text="40 - 59" />
      <LegendElement color="#4EA3C2" text="60+" />
    </div>
  );
};

const LegendElement = ({ color, text }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        margin: "5px 0px",
      }}
    >
      <div
        style={{
          backgroundColor: color,
          width: "20px",
          height: "20px",
          // borderRadius: "50%",
          marginRight: "10px",
        }}
      />
      <div>{text}</div>
    </div>
  );
};
