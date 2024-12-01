import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import "../Assets/Home.css";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Registering necessary chart elements
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const CarGarage = () => {
  // Bar chart data
  const barChartData = {
    labels: ['BMW', 'BENZ', 'KIA', 'CORONA'],
    datasets: [
      {
        label: 'Cars Repaired in 2024',
        data: [25, 30, 20, 15],
        backgroundColor: ['#4BC0C0', '#FF6384', '#36A2EB', '#FFCE56'],
        borderWidth: 1,
      },
    ],
  };

  // Pie chart data
  const pieChartData = {
    labels: ['BMW', 'BENZ', 'KIA', 'CORONA'],
    datasets: [
      {
        data: [25, 30, 20, 15],
        backgroundColor: ['#4BC0C0', '#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <div>
      <header>
        <h1>Welcome to Car Garage</h1>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/appointments">Appointments</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/login">Logout</a></li>
          </ul>
        </nav>
      </header>

      <div className="content">
        <section className="hero">
          <h2>Your Trusted Car Repair and Maintenance Service</h2>
          <p>Book your next service with us today!</p>
          <a href="/create-appointments" className="btn">Create An Appointment</a>
        </section>

        <section className="charts">
          <div>
            <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
          <div>
            <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </section>
      </div>

      {/* <footer>
        <p>&copy; 2024 Car Garage. All rights reserved.</p>
      </footer> */}
    </div>
  );
};

export default CarGarage;
