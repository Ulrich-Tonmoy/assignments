import "./Doughnut.css";

interface DoughnutProps {
  period: string;
  personal: number;
  shopping: number;
  phone: number;
  other: number;
}

const Doughnut = (data: DoughnutProps) => {
  const { period, ...values } = data;

  const total = Object.values(values).reduce((a, b) => a + b, 0);
  const formattedTotal = total.toFixed(2).split(".");

  const convertToPercent = (num: number) => Number(((num / total) * 100).toFixed(2));
  const convertToDegrees = (num: number) => (num / 100) * 360;

  const degreeValues = Object.entries(values).map(([name, value]) => {
    const percent = convertToPercent(value);
    const degree = convertToDegrees(percent);

    return {
      name,
      degree,
    };
  });

  const style = degreeValues
    .map((chart, index) => {
      const { name, degree } = chart;
      const startDegree =
        index === 0
          ? 0
          : degreeValues.slice(0, index).reduce((sum, entry) => sum + entry.degree, 0);
      const endDegree = startDegree + degree;
      return `var(--chart-${name}) ${startDegree}deg ${endDegree}deg`;
    })
    .join();

  return (
    <>
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        style={{ borderRadius: "100%" }}
      >
        <foreignObject x="0" y="0" width="100" height="100">
          <div
            style={{
              width: "100%",
              height: "100%",
              background: `conic-gradient(${style})`,
            }}
          />
        </foreignObject>
        <circle cx="50" cy="50" r="32" fill="var(--white)" />
        <text
          x="65"
          y="52"
          textAnchor="end"
          alignmentBaseline="middle"
          fill="var(--text-primary)"
          fontSize="12"
          className="text1"
        >
          ${Number(formattedTotal[0]).toLocaleString()}
        </text>

        <text
          x="65"
          y="53"
          textAnchor="start"
          alignmentBaseline="middle"
          fill="var(--text-primary)"
          fontSize="6"
          className="text2"
        >
          .{formattedTotal[1]}
        </text>
      </svg>
    </>
  );
};

export default Doughnut;
