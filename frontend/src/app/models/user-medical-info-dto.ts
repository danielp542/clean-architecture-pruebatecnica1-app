export interface UserMedicalInfoDto {
  bloodTypeId: number;  // Grupo sanguíneo
  bloodTypeName: string;
  healthSystemId: number;  // Sistema de salud
  healthSystemName: string;
  emergencyContact: string; // Contacto de emergencia
  notes: string; // Notas médicas adicionales
  medicalConditions: string; // Almacenar condiciones como un texto
}
