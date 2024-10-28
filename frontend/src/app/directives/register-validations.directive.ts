import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors, NG_VALIDATORS, Validators, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appRegisterValidations]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: RegisterValidationsDirective,
      multi: true,
    },
  ],
})
export class RegisterValidationsDirective  {
  
  validate = (control: AbstractControl): ValidationErrors | null => {
    const errors: ValidationErrors = {};

    // Validaciones de cada campo
    const nameErrors = RegisterValidationsDirective.validateName(control.get('name'));
    const lastnameErrors = RegisterValidationsDirective.validateLastname(control.get('lastname'));
    const emailErrors = RegisterValidationsDirective.validateEmail(control.get('email'));
    const passwordErrors = RegisterValidationsDirective.validatePassword(control.get('password'));
    const confirmPasswordControl = control.get('confirmPassword');
    const repeatPasswordErrors = confirmPasswordControl ? RegisterValidationsDirective.validateRepeatPassword(confirmPasswordControl) : null;

    // Agregamos errores al objeto si existen
    if (nameErrors) Object.assign(errors, nameErrors);
    if (lastnameErrors) Object.assign(errors, lastnameErrors);
    if (emailErrors) Object.assign(errors, emailErrors);
    if (passwordErrors) Object.assign(errors, passwordErrors);
    if (repeatPasswordErrors) Object.assign(errors, repeatPasswordErrors);

    return Object.keys(errors).length ? errors : null;
  }

  //Para validar el nombre
  static validateName(control: AbstractControl | null): ValidationErrors | null {
    if (!control) return null;
    const value = control.value;
    if (value.length < 2) return { 'nameError': 'El nombre debe tener al menos 2 caracteres' };
    if (value.length > 50) return { 'nameError': 'El nombre no puede tener más de 50 caracteres' };
    return null;
  }

  //Para validar el apellido
  static validateLastname(control: AbstractControl | null): ValidationErrors | null {
    if (!control) return null;
    const value = control.value;
    if (value.length < 2) return { 'lastnameError': 'El apellido debe tener al menos 2 caracteres' };
    if (value.length > 50) return { 'lastnameError': 'El apellido no puede tener más de 50 caracteres' };
    return null;
  }

  //Para validar el correo electrónico
  static validateEmail(control: AbstractControl | null): ValidationErrors | null {
    if (!control) return null;
    const value = control.value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(value) ? null : { 'emailError': 'El correo electrónico no es válido' };
  }

  //Para validar la contraseña
  static validatePassword(control: AbstractControl | null): ValidationErrors | null {
    if (!control) return null;
    const value = control.value;
    const errors: ValidationErrors = {};

    if (value.length < 8) errors['passwordErrorLength'] = 'La contraseña debe tener al menos 8 caracteres';
    if (value.length > 20) errors['passwordErrorLength'] = 'La contraseña no puede tener más de 20 caracteres';
    if (!/[A-Z]/.test(value)) errors['passwordErrorUppercase'] = 'La contraseña debe contener al menos una mayúscula';
    if (!/[a-z]/.test(value)) errors['passwordErrorLowercase'] = 'La contraseña debe contener al menos una minúscula';
    if (!/[0-9]/.test(value)) errors['passwordErrorNumber'] = 'La contraseña debe contener al menos un número';
    if (!/(?=.*[$@!%*?&])/.test(value)) errors['passwordErrorSpecial'] = 'La contraseña debe contener al menos un carácter especial ($@$!%*?&)';

    return Object.keys(errors).length ? errors : null;
  }

  //Para validar la repetición de la contraseña
  static validateRepeatPassword: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.parent?.get('password')?.value;
    const confirmPassword = control.value;

    if (password !== confirmPassword) {
      return { 'repeatPasswordError': 'Las contraseñas no coinciden' };
    }
    return null;
  };
}