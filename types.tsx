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
  color: string,
  images: string,
  subcategory: SubcategoryType,
};

export type SubcategoryType = {
  id: string,
  title: string,
  subtitle: string,
  image: string,
};
