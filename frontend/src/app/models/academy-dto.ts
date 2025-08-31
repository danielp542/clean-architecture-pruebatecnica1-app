import {MediaFileDto} from './media-file-dto';
import {AcademyThemeDto} from './academy-theme-dto';
import {CompanyParameterDto} from './company-parameter-dto';
import {AcademyAddressDto} from './academy-address-dto';

export interface AcademyDto {
  id: number;
  parentAcademyId?: number; // Id de la academia principal (si es sucursal)
  name: string;

  logoFileId?: number;
  mediaFile?: MediaFileDto;

  documentTypeId: number;
  documentNumber: string;
  documentType: string; // Se devuelve como string en lugar de objeto

  // Contacto
  phoneNumber: string;
  email: string;

  theme?: AcademyThemeDto;

  // Redes Sociales
  website?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  whatsApp?: string;
  companyParameters: CompanyParameterDto[];
  academyAddresses: AcademyAddressDto[];
}
