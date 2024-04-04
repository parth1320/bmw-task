# BMW Data Visualization Tool

This repository contains a data visualization tool designed to analyze and visualize data from BMW batteries. The tool consists of a backend and a frontend component.

## Setup Instructions

**_Backend_**

1. Install Apache XAMPP for database connection.
2. Create a database named 'bmw' in phpMyAdmin.
3. Within the 'bmw' database, create a table named 'capacity' with five fields: `cycle_number`, `time`, `current`, `voltage`, `capacity`.
4. Navigate to the backend folder.
5. Run `npm init`.
6. Install necessary npm dependencies by running `npm install`.
7. Finally, run the backend server using `node index.js`.

**_Frontend_**

1. Install Vite + React.
2. Install Tailwind CSS for responsive design.
3. Navigate to the frontend folder.
4. Run `npm install` to install dependencies.
5. Start the development server by running `npm run dev`.

**Brief Overview of the Tool**

This tool facilitates the visualization of data extracted from CSV files. Here's a brief overview of its functionality:

1. **Upload CSV File**: Users have the option to upload a CSV file containing relevant data.
2. ** Line Chart Visualization**: The tool renders the data from the CSV file into a line chart using Chart.js and react-chartjs-2. Initially, it 
                                  displays as a multiline chart.
3. **Chart Customization**: Users can select between a line or scatter chart. Additionally, they can manipulate the data displayed on the chart by 
                            selecting specific parameters like voltage, current, and capacity.
4. **Hover Information**: Hovering over the chart displays data for a particular point.
5. **Zooming**: Users can zoom in and out of the chart using mouse scrolling. A reset option is also available to revert to the original view.
6. **Toggle X-Axis Data**: Users have the flexibility to toggle between displaying data based on time or cycle_number on the X-axis by clicking a 
                           toggle button located near the chart.

**Dependencies**
1. React.js
2. Chart.js
3. react-chartjs-2
4. chartjs-plugin-zoom
5. tailwindcss
6. etc...
