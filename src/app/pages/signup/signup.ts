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
        CheckboxModule
    ],
    templateUrl: './signup.html',
    styleUrl: './signup.scss',
})
export class Signup {
    signupForm: FormGroup;
    loading = false;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService
    ) {
        this.signupForm = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(3)]],
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
                    console.log('Signup successful', res);
                    this.router.navigate(['/admin/dashboard']);
                },
                error: (err) => {
                    console.error('Signup failed', err);
                    this.loading = false;
                },
                complete: () => {
                    this.loading = false;
                }
            });
        } else {
            Object.keys(this.signupForm.controls).forEach(key => {
                const control = this.signupForm.get(key);
                control?.markAsTouched();
            });
        }
    }
}
