<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Medical Prescription</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 0.5rem;
    }
    .container {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      padding: 0.75rem 0.75em;
      position: relative;
      max-width: 800px;
      margin: auto;
    }
    h3 {
      text-align: center;
      margin-bottom: 30px;
    }
    h4 {
      color: #007bff; /* PRIMARY_BLUE */
      margin-bottom: 3px;
    }
    .row {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 15px;
    }
    .col {
      flex: 1 1 100%;
    }
    @media(min-width: 768px) {
      .col-md-6 {
        flex: 1 1 45%;
      }
    }
    .flex {
      display: flex;
      gap: 15px;
      align-items: center;
      margin-bottom: 4px;
    }
    .divider {
      border-top: 1px solid #ddd;
      margin: 20px 0;
    }
    .capitalize {
      text-transform: capitalize;
      font-weight: 600;
    }
    .medicine-link {
      display: flex;
      justify-content: space-between;
      text-decoration: none;
      color: inherit;
      margin-bottom: 5px;
    }
    .medicine-link h5 {
      color: green; /* PRIMARY_GREEN */
      margin: 0;
    }
    .logo {
      position: absolute;
      top: 0;
      left: 0;
      height: 40px;
    }
  </style>
</head>
<body>

<div class="container">

  <h3>Medical Prescription</h3>

  <h5>Provided By</h5>
  <div class="row">
    <div class="col col-md-6">
      <h4>Dr. {{ $doctor -> first_name }} {{ $doctor -> last_name }}</h4>
      <div class="flex">
        <p>{{ $doctor -> speciality }}</p>
      </div>
    </div>
    <div class="col col-md-6">
      <div class="flex">
        <p>{{ $doctor -> phone_number }}</p>
      </div>
      <div class="flex">
        <p>{{ $doctor -> email }}</p>
      </div>
      <div class="flex">
        <p>{{ $doctor -> address }}, {{ $doctor -> city }}</p>
      </div>
    </div>
  </div>

  <div class="divider"></div>

  <h5>Patient</h5>
  <div class="row" style="margin-bottom: 50px;">
    <div class="col col-md-6">
      <h4>{{ $user -> first_name }} {{ $user -> last_name }}</h4>
      <div class="flex">
        <p>{{ $user -> email }}</p>
      </div>
    </div>
    <div class="col col-md-6">
      <div class="flex">
        <p>{{ $appointment -> appointment_date }}</p>
      </div>
      <div>
        <p class="capitalize">{{ str_replace('_', '-', $appointment -> appointment_type) }} Appintment</p>
      </div>
    </div>
  </div>

  <div class="row" style="margin-bottom: 30px;">
    <div class="col col-md-6">
      <h4>Notes</h4>
      <p>{{ $note }}</p>
    </div>
    <div class="col col-md-6">
      <h4>Medicines</h4>

    </div>
  </div>

</div>

</body>
</html>
