export type RootStackParamList = {
  Root: undefined;
  Home: undefined;
  StartFinish: undefined;
  Subcategory: undefined;
  Flashcards: undefined;
  Settings: undefined;
  NotFound: undefined;
  Login: undefined;
};

export type CategoryType = {
  id: string,
  title: string,
  subtitle: string,
  color: colorType,
  images: string,
};

export type SubcategoryType = {
  id: string,
  title_polish: string,
  subtitle_polish: string,
  image: string,
};

export type colorType = Array<any>
