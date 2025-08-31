export interface MenuDto {
  id: number;
  name: string;
  route: string;
  icon: string;
  sortOrder: number;
  children: MenuDto[];
}
