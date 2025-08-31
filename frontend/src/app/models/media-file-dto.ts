export interface MediaFileDto {
  fileName: string;
  fileType: string;
  fileSize: number;
  data: string; // Base64 o URL del archivo
}
