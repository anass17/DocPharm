<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Delivery Code Email</title>
</head>
<body>
    <h1>Hello, {{ $user->first_name }}</h1>
    <p>Here is your delivery confirmation code:</p>
    <strong style="font-size: 22px">{{ $code }}</strong>
    <p>You can use that to collect your medicines and confirm the delivery</p>
</body>
</html>