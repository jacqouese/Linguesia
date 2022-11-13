import { FlashcardLevelType, LocalFlashcardType } from '../../types';
import { SqlModel } from './sqlModel';
import { getFlashcardLevelsType, getFlashcardsType, updateFlashcardRememberedType } from './sqlTypes';

export default class SqlActions {
    db: SqlModel;

    constructor() {
        this.db = new SqlModel();
    }

    getFlashcards({ id, categoryId }: getFlashcardsType, callback: (res: Array<LocalFlashcardType>) => void) {
        this.db.execute(
            `SELECT flashcards.remote_id, flashcards.german, flashcards.german_article, flashcards.english, flashcards.polish, flashcards.image, flashcard_progress.remembered FROM flashcards INNER JOIN flashcard_progress ON flashcards.remote_id = flashcard_progress.remote_id WHERE flashcard_progress.remembered < 2 AND flashcard_levels_id = ? AND flashcard_progress.level_type = ? LIMIT 20`,
            [id, categoryId],
            (tx, results) => {
                typeof callback === 'function' && callback(results.rows._array);
            }
        );
    }

    updateFlashcardRemembered({ rememberedValue, cardId, levelType }: updateFlashcardRememberedType) {
        this.db.execute(
            `UPDATE flashcard_progress SET remembered = ? where remote_id = ? and level_type = ?`,
            [rememberedValue, cardId, levelType],
            (tx, result) => {
                console.log(result);
            }
        );
    }

    getFlashcardLevels({ categoryId }: getFlashcardLevelsType, callback: (res: Array<FlashcardLevelType>) => void) {
        const isVerb = categoryId === 3 ? 1 : 0;
        this.db.execute(
            `SELECT flashcard_levels.id, flashcard_levels.image, flashcard_levels.remote_id, flashcard_levels.subtitle_polish, flashcard_levels.title_polish FROM flashcard_levels WHERE flashcard_levels.is_verb = ?`,
            [isVerb],
            (tx, results) => {
                console.log(results.rows._array);
                typeof callback === 'function' && callback(results.rows._array);
            }
        );
    }
}
