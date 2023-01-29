import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthFacade, queryParamRedirectToAfterLogin } from '@mono/auth/data-access';

@Component({
  selector: 'mono-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLoginComponent {
  public formGroup: FormGroup;
  private readonly redirectTo: string | null;

  constructor(private formBuilder: FormBuilder, private authFacade: AuthFacade, activatedRoute: ActivatedRoute) {
    this.redirectTo = activatedRoute.snapshot.queryParamMap.get(queryParamRedirectToAfterLogin);

    this.formGroup = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required]),
      password: this.formBuilder.control('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }

    const name = this.formGroup.get('name')?.value;
    const password = this.formGroup.get('password')?.value;

    this.authFacade.login(name, password, this.redirectTo);
  }
}
