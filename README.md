# DocPharm

## Overview & Objective

This project is a platform designed for the management of pharmacies and medical consultations. It enables healthcare professionals, pharmacies, and administrators to efficiently manage appointments, prescriptions, products, and healthcare-related information. The platform focuses on ensuring user-friendliness while maintaining a high level of security and confidentiality of user data.

## Features

### 1. User Account Registration and Management
- **User Registration:** Allows users to register as clients, doctors, or pharmacists.
- **Login:** Users can log in using their email address and password.
- **User Profiles:** Each user profile contains specific information such as name, contact details, specialty (for doctors), and pharmacy name (for pharmacists).
- **Profile Modification:** Registered users can modify their personal information.

### 2. Patient Management
- **Patient Information:** Patients can consult and update their personal information, such as address, phone number, etc.
- **Medical History:** After a consultation, patients can access their prescription and appointment history.
- **Consultation and Prescription Tracking:** Patients can track their consultation history, prescriptions, and online purchases.

### 3. Medical Consultations Management
- **Appointment Scheduling:** Patients can schedule online appointments with doctors, and doctors can manage their schedules through the platform.
- **Prescriptions:** After each consultation, doctors can issue prescriptions electronically to the patients.
- **Prescription Viewing and Medication Purchase:** Patients can view their prescriptions and either purchase recommended medications online or from a pharmacy.
- **Prescription Download:** Patients can download their prescriptions for reference or offline access.
- **Doctor Availability:** Doctors can set and modify their availability for appointments.

### 4. Online Pharmacy Management
- **Browse Available Medications:** Clients can view available medications in pharmacies, along with detailed information about each product.
- **Online Medication Orders:** Clients can place online orders for medications.
- **Pharmacy Working Hours:** Clients can check the working hours of pharmacies.
- **Browse Registered Pharmacies:** Clients can explore pharmacies that are registered on the platform.

### 5. Statistics
- **Administrator Statistics:** Administrators can access general platform statistics, such as the number of registered users.
- **Doctor and Pharmacist Statistics:** Doctors and pharmacists can access their own statistics, including the number of products sold and the number of appointments scheduled.

### 6. Notifications
- **Patient Notifications:** Patients receive notifications via email of any updates

### 7. Administrator Role
- **Account Approval:** Administrators approve the accounts of doctors and pharmacies.
- **Account Deactivation:** Administrators have the ability to deactivate accounts when necessary.
- **Account Activation:** Administrators have the ability to activate accounts.
- **Moderate Platform Content:** Administrators can manage medicines added by pharmacies, by modifiying their details or deleting them.

### 8. Search and Filtering
- **Search:** Users can search for doctors, pharmacies, and medical products.
- **Filtering:** Users can filter products based on attributes such as price and other criteria.

## Technologies Used

The platform uses the following technologies:

### Frontend:

- HTML, CSS, JavaScript
- React.js
- React Redux
- Tailwind CSS for styling
- Material UI, Ant Design for UI components

### Backend:

- PHP
- Laravel framework for server-side logic

### Database:

- PostgreSQL for data storage and management

##  Installation

Follow the steps below to install and run the project locally.

### Prerequisites

Make sure you have the following installed on your machine:

- PHP >= 8.x
- Composer
- Node.js & npm
- PostgreSQL (or your preferred database)
- Laravel CLI

### 1. Clone the Repository

```bash
git clone https://github.com/anass17/DocPharm.git
cd docpharm
```

### 2. Backend Setup (Laravel)

```bash
cd backend
composer install

# Copy .env and configure it
cp .env.example .env

# Generate application key
php artisan key:generate

# Set your database credentials in the .env file
# Configure your stripe and mail in the .env file

# Run migrations
php artisan migrate --seed

# Start Laravel server
php artisan serve
```

### 3. Frontend Setup (React)

```bash
cd frontend
npm install

# Start React development server
npm run dev
```

### 4. Access the App
- **Backend API:** http://localhost:8000
- **Frontend UI:** http://localhost:5173

## Demo

### Screenshots

![Home Page](https://github.com/user-attachments/assets/edaa9e7b-e611-42e8-983d-f75ab5ba2cb8)
![Rgister](https://github.com/user-attachments/assets/61cc0c49-c418-4553-a27c-c3cb24ceb613)
![Admin Dashboard](https://github.com/user-attachments/assets/5ac6f210-a992-4cca-80cc-f837a3229f8a)
![Pharmacy Profile](https://github.com/user-attachments/assets/8684bbe2-ecd6-4def-82ae-d6879bfe3426)
![Client Appointments](https://github.com/user-attachments/assets/77d981fd-c42d-478e-b35b-05a0b211d7f3)
![Medicines Catalogue](https://github.com/user-attachments/assets/ab290724-c034-4b59-9243-b5ca63d8a3a1)
![Doctor Appointments](https://github.com/user-attachments/assets/47422359-c4f2-428e-a032-82820f5bde2e)