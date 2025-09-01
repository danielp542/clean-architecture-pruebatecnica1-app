import {UserActivityDto} from './user-activity-dto';
import {UserEducationDto} from './user-education-dto';
import {UserExperienceDto} from './user-experience-dto';
import {UserGuardianDto} from './user-guardian-dto';
import {UserMedicalInfoDto} from './user-medical-info-dto';

export interface UserDto {
  documentTypeId: number;
  documentTypeName: string;
  abbreviation: string;
  documentNumber: string;
  firstName: string;
  middleName?: string;  // Segundo Nombre
  lastName?: string;
  secondLastName?: string;  // Segundo Apellido
  birthDate: Date;  // Fecha de Nacimiento
  genderId: number;  // Género
  genderName: string;
  statusId: number;
  statusName: string;
  cityId: number;
  cityName: string;
  address: string;  // Dirección
  email: string;
  aboutMe: string;
  phoneNumber: string;
  userActivityDto: UserActivityDto[];
  userEducationDto: UserEducationDto[];
  userExperienceDto: UserExperienceDto[];
  userGuardianDto: UserGuardianDto[];
  userMedicalInfoDto: UserMedicalInfoDto[];
}
