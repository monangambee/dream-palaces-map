const ctx = document.getElementById("dream_palace").getContext("2d");

const data = {
  condition: { Active: 4, Alive: 12, Demolished: 8 },
  typology: { palace: 10, theater: 6, museum: 9 },
  ownership: { private: 7, public: 13, collective: 4 },
};

// === 处理数据 ===
const categories = ["condition", "typology", "ownership"];
// 找出每组内部的所有子类别
const subLabels = [...new Set(Object.values(data).flatMap(Object.keys))];

// 为每个子类别创建一个 dataset
const datasets = subLabels.map((sub, i) => ({
  label: sub,
  backgroundColor: [
    "#90caf9",
    "#64b5f6",
    "#42a5f5",
    "#ba68c8",
    "#f06292",
    "#81c784",
    "#ffb74d",
  ][i % 7],
  data: categories.map((cat) => data[cat][sub] || 0), // 没有的填0
}));

// === 绘制图表 ===
new Chart(ctx, {
  type: "bar",
  data: {
    labels: categories.map((c) => c[0].toUpperCase() + c.slice(1)), // 格式化标题
    datasets: datasets,
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: false,
        text: "Attributes by Category",
      },
    },
    scales: {
      x: { stacked: true },
      y: { stacked: true, beginAtZero: true },
    },
  },
});
