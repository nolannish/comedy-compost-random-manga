export interface Manga {
  title: string;
  synopsis?: string;
  images?: {
    jpg?: {
      image_url?: string;
    };
  };
}