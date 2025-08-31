import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {SubscriptionTypeDto} from '../../../../models/subscription-type-dto';
import {BankAccountCardComponent} from '../../../../@store/widgets';
import {CurrencyPipe, NgIf} from '@angular/common';
import {UploadAreaComponent, UploadTriggerDirective} from '@elementar-ui/components/upload';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ImageViewerDirective} from '@elementar-ui/components/image-viewer';
import {SubscriptionDto} from '../../../../models/subscription-dto';
import {AcademySuscriptionService} from '../../../../core/services/academy-suscription.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';


@Component({
  selector: 'app-academy-subscription-modal',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    BankAccountCardComponent,
    CurrencyPipe,
    UploadTriggerDirective,
    UploadAreaComponent,
    ReactiveFormsModule,
    NgIf,
    ImageViewerDirective,
  ],
  templateUrl: './academy-subscription-modal.component.html',
  styleUrl: './academy-subscription-modal.component.scss'
})
export class AcademySubscriptionModalComponent {
  uploadForm: FormGroup;
  fileUrl: string | null = null;
  isImage: boolean = false;
  fileBase64: string | null = null;
  subscriptionDto!: SubscriptionDto;

  constructor(private fb: FormBuilder,
    private router: Router,
    private _services: AcademySuscriptionService,
    public dialogRef: MatDialogRef<AcademySubscriptionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { data: SubscriptionTypeDto }

  ) {
    this.uploadForm = this.fb.group({
      file: [null, Validators.required]
    });
  }

  close(): void {
    this.dialogRef.close();
  }


  files: any[] = [];

  onFileSelected(event: any) {
    let file: File | null = null;

    // Verificar si el evento proviene de emr-upload-area
    if (event.files && event.files.length > 0) {
      file = event.files[0];
    }
    // Verificar si el evento proviene de un input file
    else if (event.target && event.target.files && event.target.files.length > 0) {
      file = event.target.files[0];
    }

    // Si no hay archivo, salir
    if (!file) return;

    // Validar tipo de archivo (solo imágenes, NO PDFs)
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      alert('Solo se permiten imágenes (JPG, PNG).');
      return;
    }

    // Guardar información del archivo
    this.files = [{ name: file.name, size: file.size }];
    this.uploadForm.patchValue({ file: file });
    this.uploadForm.updateValueAndValidity();



    this.convertToBase64(file).then((base64Data: string) => {
      const base64Only = base64Data.split(',')[1]; // Eliminar el prefijo

      this.subscriptionDto = {
        subscriptionTypeId: this.data.data.id, // Asignar el ID
        mediaFile: {
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          data: base64Only, // Solo el Base64 sin prefijo
        }
      };

      console.log(this.subscriptionDto);
    }).catch(error => {
      console.error("Error al convertir archivo a Base64:", error);
    });



    // Crear URL temporal del archivo
    this.fileUrl = URL.createObjectURL(file);
    this.isImage = file.type.startsWith('image/');
  }


  convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  onSubmit() {
    if (this.uploadForm.valid) {
      console.log('Archivo enviado en base64:', this.subscriptionDto);

      // Llamar al servicio para enviar los datos
      this._services.purchaseMembership(this.subscriptionDto).subscribe({
        next: (response) => {
          // Mostrar alerta de éxito
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Tu archivo ha sido enviado correctamente, vuelve a iniciar sesión.',
            confirmButtonText: 'Aceptar'
          });

          this.dialogRef.close();
          sessionStorage.clear();
          setTimeout(() => {
            this.router.navigate(['/auth']);
          }, 3000);
        },
        error: (error) => {
          console.error('Error al enviar archivo:', error);

          // Mostrar alerta de error
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al enviar el archivo. Intenta nuevamente.',
            confirmButtonText: 'Cerrar'
          });
        }
      });
    }
  }
}
