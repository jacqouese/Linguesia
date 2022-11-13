export type updateFlashcardRememberedType = {
    rememberedValue: 0 | 1 | 2;
    cardId: number;
    levelType: number;
};

export type getFlashcardsType = {
    id: number;
    categoryId: number;
};

export type getFlashcardLevelsType = {
    categoryId: number;
};
