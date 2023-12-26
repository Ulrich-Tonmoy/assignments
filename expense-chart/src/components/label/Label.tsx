import "./Label.css";

interface LabelProps {
  period: string;
  personal: number;
  shopping: number;
  phone: number;
  other: number;
}

const Label = (data: LabelProps) => {
  const { period, ...values } = data;
  const labelArray = Object.entries(values).map(([name]) => ({ name }));

  return (
    <div className="label-container">
      {labelArray.map((value, i) => (
        <div key={i}>
          <div className={`label color-${value.name}`}></div>
          <span className="label-title">{value.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Label;
