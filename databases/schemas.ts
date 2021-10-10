import Realm from 'realm';

export const FLASHCARDS_SCHEMA = "Flashcards";
export const REMBERED = 'Rembered';

export const FlashcardsSchema = {
        name: FLASHCARDS_SCHEMA,
        primaryKey: 'id',
        properties: {
            id: 'int',
            word: 'string',
            translation: 'string',
            remembered: { type: 'bool', default: false}
        }
};

const databaseOptions = {
    path: 'flashcards.realm',
    schema: [FlashcardsSchema],
    schemaVersion: 0,
};

export const insertFlashcard = newFlashcard => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(FLASHCARDS_SCHEMA, newFlashcard)
        });
    }).catch((error) => reject(error));
});

export const updateFlashcard = flashcard => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
           let updatingFlashcard = realm.objectForPrimaryKey(FLASHCARDS_SCHEMA, flashcard.id);
           updatingFlashcard.word = flashcard.word
           resolve();
        });
    }).catch((error) => reject(error));
});

export const deleteFlashcard = flashcardId => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
           let deletingFlashcard = realm.objectForPrimaryKey(FLASHCARDS_SCHEMA, flashcardId);
           realm.delete(deletingFlashcard);
           resolve()
        });
    }).catch((error) => reject(error));
});

export const queryAllFlashcard = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
       let allFlashcard = realm.objects(FLASHCARDS_SCHEMA);
       resolve(allFlashcard)
    }).catch((error) => reject(error));
});

export default new Realm(databaseOptions);