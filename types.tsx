export type RootStackParamList = {
  Root: undefined;
  Home: undefined;
  StartFinish: undefined;
  Subcategory: undefined;
  Flashcards: undefined;
  Settings: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
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
