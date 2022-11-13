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
    id: string;
    title: string;
    subtitle: string;
    color: colorType;
    images: string;
};

export type SubcategoryType = {
    id: string;
    title_polish: string;
    subtitle_polish: string;
    image: string;
};

export type FlashcardLevelType = {
    id: number;
    remote_id: number;
    image: string;
    title_polish: string;
    subtitle_polish: string;
};

export type LocalFlashcardType = {
    remote_id: number;
    german: string;
    german_article: 'die' | 'der' | 'das';
    english: string;
    polish: string;
    image: string;
    remembered: 0 | 1 | 2;
};

export type FlashcardStateProps = {
    id: number;
    remote_id: number;
    word: string;
    article: string;
    translation: string;
    remembered: number;
};

export type colorType = Array<any>;
