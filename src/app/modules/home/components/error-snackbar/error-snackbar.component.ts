import { Component, Inject, Optional } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-error-snackbar',
  templateUrl: './error-snackbar.component.html',
  styleUrls: ['./error-snackbar.component.scss'],
})
export class ErrorSnackbarComponent {
  constructor(
    @Optional()
    @Inject(MAT_SNACK_BAR_DATA)
    public data: { errorMessage: string; onClose: () => void }
  ) {}

  public closeSnackbar() {
    if (this.data?.onClose) {
      this.data.onClose();
    }
  }
}
