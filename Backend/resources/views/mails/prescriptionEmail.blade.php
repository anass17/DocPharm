<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prescription Email</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
</head>
<body>
    <h1 class="text-lg">Hello, {{ $user -> first_name }}!</h1>
    <p>A new prescription has been issued by Dr. {{ $doctor -> first_name }} {{ $doctor -> last_name}} for the appointment that took place on {{ \Carbon\Carbon::parse($appointment -> appointment_date) -> format('F j, Y - H:i') }}.</p>
    <p>Please log in to view the full details.</p>
</body>
</html>