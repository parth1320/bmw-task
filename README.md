# BMW Data Visualization Tool

This is a data visualization tool built with React.js and Chart.js, now using TypeScript for the frontend. It provides users with the ability to upload CSV files containing data, visualize the data using interactive charts (such as line plots, multi-line plots, and scatter plots), and manipulate visualization parameters like chart type, and axis labels. For the backend, Sequelize ORM has been integrated, making database interaction more secure and manageable. The tool is designed to be user-friendly, responsive, and capable of handling large datasets efficiently.

## Setup Instructions

**_Backend_**

1. Install Apache XAMPP for database connection.
2. Create a database named 'cell_test_data' in phpMyAdmin.
3. Navigate to the server folder.
4. Run `npm init`.
5. Install necessary npm dependencies by running `npm install`.
6. Finally, run the backend server using `npm run dev`.

**_Frontend_**

1. Install Vite + React.
2. Install Tailwind CSS for responsive design.
3. Navigate to the frontend folder.
4. Run `npm install` to install dependencies.
5. Start the development server by running `npm run dev`.

**_Brief Overview of the Tool_**

This tool facilitates the visualization of data extracted from CSV files. Here's a brief overview of its functionality:

1. **Upload CSV File**: Users have the option to upload a CSV file containing relevant data.
2. **Line Chart Visualization**: The tool renders the data from the CSV file into a line chart using Chart.js and react-chartjs-2. Initially, it 
                                  displays as a multiline chart.
3. **Chart Customization**: Users can select between a line or scatter chart. Additionally, they can manipulate the data displayed on the chart by 
                            selecting specific parameters like voltage, current, and capacity.
4. **Hover Information**: Hovering over the chart displays data for a particular point.
5. **Zooming**: Users can zoom in and out of the chart using mouse scrolling. A reset option is also available to revert to the original view.
6. **Download**: Users can download the charts
7. **Toggle X-Axis Data**: Users have the flexibility to toggle between displaying data based on time or cycle_number on the X-axis by clicking a 
                           toggle button located near the chart.

**Dependencies**
1. React.js
2. Chart.js
3. react-chartjs-2
4. sequelize
5. express
6. multer
7. csv-parser
8. chartjs-plugin-zoom
9. tailwindcss
10. lodash etc ...


    
