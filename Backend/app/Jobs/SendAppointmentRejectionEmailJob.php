<?php

namespace App\Jobs;

use App\Mail\AppointmentRejectionEmail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;

class SendAppointmentRejectionEmailJob implements ShouldQueue
{
    use Queueable;

    protected $user;
    protected $doctor;
    protected $appointment;

    /**
     * Create a new job instance.
     */
    public function __construct($user, $doctor, $appointment)
    {
        $this->user = $user;
        $this->doctor = $doctor;
        $this->appointment = $appointment;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Mail::to(env('TESTING_MODE', true) ? 'anassboutaib2018@gmail.com' : $this->user->email)
            ->send(new AppointmentRejectionEmail($this->user, $this->doctor, $this->appointment));
    }
}
