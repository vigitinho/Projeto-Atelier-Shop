export interface Vestido {
  id?: number;
  title: string;
  description: string;
  color: string;
  value: string;
  style: string;
  image: string;
  created_at?: string;
  updated_at?: string;
  comments?: [{ username: string; text: string }];
}
