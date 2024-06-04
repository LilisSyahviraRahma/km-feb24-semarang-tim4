import PaymentMethodPercentage from "../Json/PaymentMethodPercentage.json" assert {type: "json"};
import PaymentMethodSixMonth from "../Json/PaymentMethodSixMonth.json" assert {type: "json"};

const allTimeData5 = PaymentMethodPercentage.map(item => ({
  type: item.type,
  Total_Sales: parseFloat(item.Total_Sales)
}));

const sixMonthData5 = PaymentMethodSixMonth.map(item => ({
  type: item.type,
  Total_Sales: parseFloat(item.Total_Sales)
}));

let allTimeCurrentData5 = allTimeData5;
let sixMonthCurrentData5 = sixMonthData5;

let currentData5 = allTimeCurrentData5;

const ctx = document.getElementById("paymentMethodPieChart").getContext("2d");

// Fungsi untuk mendapatkan warna acak
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Membuat array warna untuk setiap mesin
const backgroundColors = allTimeData5.map(() => getRandomColor());

let pieChart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: currentData5.map(item => item.type),
    datasets: [
      {
        data: currentData5.map(item => item.Total_Sales),
        backgroundColor: backgroundColors,
        borderColor: backgroundColors,
        borderWidth: 1
      }
    ]
  }
});

// Fungsi untuk memperbarui chart dengan data yang diberikan
function updateChart5(data) {
  pieChart.data.labels = data.map(item => item.type);
  pieChart.data.datasets[0].data = data.map(item => item.Total_Sales);
  pieChart.update();
}

// Panggil fungsi untuk memperbarui chart saat halaman dimuat
updateChart5(allTimeCurrentData5);

// Event listener untuk dropdown
document.getElementById("categoryFilter").addEventListener("change", (event) => {
  const selectedCategory = event.target.value;
  if (selectedCategory === "alltime") {
    currentData5 = allTimeCurrentData5; // Set data yang sedang ditampilkan menjadi data all time
    updateChart5(allTimeCurrentData5); // Memuat lima produk teratas dari data semua waktu
  } else if (selectedCategory === "sixmonth") {
    currentData5 = sixMonthCurrentData5; // Set data yang sedang ditampilkan menjadi data enam bulan
    updateChart5(sixMonthCurrentData5); // Memuat lima produk teratas dari data enam bulan
  }
});