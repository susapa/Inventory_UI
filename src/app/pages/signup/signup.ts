import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        PasswordModule,
        FloatLabelModule,
        CheckboxModule,
        ToastModule,
        RippleModule
    ],
    templateUrl: './signup.html',
    styleUrl: './signup.scss',
})
export class Signup {
    signupForm: FormGroup;
    loading = false;

    constructor(private messageService: MessageService,
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService
    ) {
        this.signupForm = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(6)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required]],
            agreeTerms: [false, [Validators.requiredTrue]]
        }, { validator: this.passwordMatchValidator });
    }

    passwordMatchValidator(g: FormGroup) {
        return g.get('password')?.value === g.get('confirmPassword')?.value
            ? null : { 'mismatch': true };
    }

    onSignup() {
        if (this.signupForm.valid) {
            this.loading = true;
            this.authService.signup(this.signupForm.value).subscribe({
                next: (res) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Registration successful! Redirecting to login...'
                    });
                    setTimeout(() => {
                        this.router.navigate(['/login']);
                    }, 2000);
                },
                error: (err) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Registration Failed',
                        detail: err.error?.message || 'Something went wrong. Please try again.'
                    });
                    this.loading = false;
                },
                complete: () => {
                    this.loading = false;
                }
            });
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Sign Up Failed',
                detail: 'Please fill out all required fields correctly.'
            });
            Object.keys(this.signupForm.controls).forEach(key => {
                const control = this.signupForm.get(key);
                control?.markAsTouched();
            });
        }
    }
}
