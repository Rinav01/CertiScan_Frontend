import { useLocation } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function Results() {
  const { state } = useLocation();
  const { file, data } = state;

  const chartData = [
    { name: "Confidence", value: data.confidence },
  ];

  return (
    <div className="min-h-screen text-white bg-[#020617] p-10">

      <h1 className="text-3xl mb-6">Results</h1>

      {/* Image Preview */}
      <img
        src={URL.createObjectURL(file)}
        className="w-64 rounded-xl mb-6"
      />

      {/* Prediction */}
      <p className="text-xl">
        Prediction: <span className="font-bold">{data.label}</span>
      </p>

      <p className="mb-4">
        Confidence: {data.confidence}%
      </p>

      {/* Mask */}
      {data.mask && (
        <img
          src={`data:image/png;base64,${data.mask}`}
          className="w-64 rounded-xl mb-6"
        />
      )}

      {/* Graph */}
      <BarChart width={300} height={200} data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" />
      </BarChart>

    </div>
  );
}