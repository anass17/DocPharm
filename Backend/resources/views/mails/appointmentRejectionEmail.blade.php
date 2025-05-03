<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Delivery Code Email</title>
</head>
<body>
    <h1>Hello, {{ $user->first_name }}</h1>
    <p>Your appointment with Dr. {{ $doctor -> first_name }} {{ $doctor -> last_name }}, scheduled for {{ $appointment -> appointment_date }} has been canceled</p>
    <h5>Doctor's Note:</h5>
    <p>{{ $appointment -> appointment_rejection_note }}</p>
</body>
</html>