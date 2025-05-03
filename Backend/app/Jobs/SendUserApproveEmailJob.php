<?php

namespace App\Jobs;

use App\Mail\UserApproveEmail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;

class SendUserApproveEmailJob implements ShouldQueue
{
    use Queueable;

    protected $user;

    /**
     * Create a new job instance.
     */
    public function __construct($user)
    {
        $this -> user = $user;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Mail::to(env('TESTING_MODE', true) ? 'anassboutaib2018@gmail.com' : $this->user->email)
            ->send(new UserApproveEmail($this->user));
    }
}
