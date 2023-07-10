import { Stack } from "@mui/material";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement } from "chart.js/auto";
ChartJS.register(ArcElement);

interface DataEntry {
  name: string;
  count: string;
}

interface PieChartProps {
  data: DataEntry[];
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map((e) => e.name),
    datasets: [
      {
        label: "Users Gained",
        data: data.map((e) => e.count),
        backgroundColor: [
          "#6096B4",
          "#93BFCF",
          "#F4B183",
          "#8294C4",
          "#ACB1D6",
          "#FFD966",
          "#BDCDD6",
          "#EEE9DA",
          "#DFA67B",
        ],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  return (
    <Stack sx={{ width: "400px", alignItems: "center", padding: "20px" }}>
      <Pie data={chartData} />
    </Stack>
  );
};

export default PieChart;
