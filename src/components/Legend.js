export const Legend = ({ranges}) => {
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
      <div style={{ fontWeight: "bold", fontSize: "18px" }}>Legenda</div>
      <LegendElement color="#754E23" text={0} /> 
      <LegendElement color="#FFC180" text={"<" + ranges[0]} /> 
      <LegendElement color="#C2894D" text={"<" + ranges[1]} /> 
      <LegendElement color="#175C75" text={"<" + ranges[2]} /> 
      <LegendElement color="#4EA3C2" text={ranges[2] + "+"} /> 
    </div>
  );
};

export const POILegend = () => {
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
      <div style={{ fontWeight: "bold", fontSize: "18px" }}>Tipologie di POI</div>
      <LegendElement color="#237CC9" text="Edificio Storico" />
      <LegendElement color="#22AC1F" text="Parco" />
      <LegendElement color="#CB2C3F" text="Teatro" />
      <LegendElement color="#CAC426" text="Dipartimento" />
      <LegendElement color="#9C2BCB" text="Museo" />
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
          marginRight: "10px",
        }}
      />
      <div>{text}</div>
    </div>
  );
};
