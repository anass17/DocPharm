<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PrescriptionEmail extends Mailable
{
    use Queueable, SerializesModels;

    protected $user;
    protected $doctor;
    protected $appointment;

    /**
     * Create a new message instance.
     */
    public function __construct($user, $doctor, $appointment)
    {
        $this->user = $user;
        $this->doctor = $doctor;
        $this->appointment = $appointment;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Prescription Created',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mails.prescriptionEmail',
            with: [
                'user' => $this->user,
                'doctor' => $this->doctor,
                'appointment' => $this->appointment,
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
