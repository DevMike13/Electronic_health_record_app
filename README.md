# Electronic Health Record (EHR) for Students

This is an Electronic Health Record (EHR) application developed using **React Native** and **SQLite** to gather, manage, and store the health records of students in selected schools across Quezon Province. The application allows for the tracking and retrieval of students' medical data, improving health record management and accessibility for authorized personnel.

## Features

- **Student Health Records**: Ability to store, update, and view health records for each student.
- **SQLite Database**: Uses SQLite for local data storage for offline access.
- **Responsive UI**: Built with React Native to ensure compatibility with both Android and iOS devices.
- **Search and Filter**: Easily search and filter health records based on student information or medical conditions.
- **Secure Data**: Local database ensures data privacy and security by being stored on the device.
- **User-Friendly Interface**: Simple and intuitive interface designed for non-technical users to input and retrieve health information efficiently.

## Installation

### Prerequisites

Make sure you have the following installed:

- Node.js (latest version)
- Expo CLI
- React Native
- SQLite (for local storage)

### Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/DevMike13/Electronic_health_record_app.git
    cd Electronic_health_record_app
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Install Expo CLI (if not already installed):

    ```bash
    npm install -g expo-cli
    ```

4. Run the application:

    ```bash
    npx expo start
    ```

5. Open the app in the Expo Go app on your phone, or use an Android/iOS emulator to run the app.

## Usage

1. **Adding Student Health Records**: Navigate to the "Add Record" section and input the student’s health information, such as medical history, allergies, and vaccinations.
2. **Viewing Records**: Navigate to the "View Records" section to search for and view the health records of students.
3. **Search & Filter**: Use the search bar and filter options to find specific student records based on their name, school, or medical condition.
4. **Editing Records**: Select any existing record and make the necessary edits.
5. **Delete Records**: Users can delete records if needed, ensuring that only relevant information is maintained.

## SQLite Database Structure

The app uses SQLite to store the data locally. The database structure includes the following tables:

- **students**: Stores personal details like name, age, school, etc.
- **health_records**: Stores medical information for each student (linked to the students table).

## Technologies Used

- **React Native**: For building the cross-platform mobile app.
- **SQLite**: For local storage of health records.
- **Expo**: For rapid development and testing of the app.