import PropTypes from "prop-types";

const CircleComponent = ({ percentage }) => {
  const radius = 30;
  const stroke = 4;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  return (
    <svg height="100%" width="100%">
      <circle
        stroke="#1e293b" // background track (gray-800)
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx="40"
        cy="40"
      />
      <circle
        stroke={
          percentage >= 70
            ? "#22c55e"
            : percentage >= 40
            ? "#facc15"
            : "#ef4444"
        }
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference + " " + circumference}
        style={{
          strokeDashoffset,
          transition: "stroke-dashoffset 0.5s",
        }}
        r={normalizedRadius}
        cx="40"
        cy="40"
        transform="rotate(-90 40 40)"
      />
    </svg>
  );
};

CircleComponent.propTypes = {
  percentage: PropTypes.number.isRequired,
};

export default CircleComponent;
