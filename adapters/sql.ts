import * as SQLite from 'expo-sqlite';

const dbObj = SQLite.openDatabase('linguesia.db');

export const dropAllTables = () => {
    dbObj.transaction((tx) => {
        tx.executeSql(
            `drop table  flashcard_levels`,
            [],
            (tx, result) => {
                tx.executeSql(
                    `drop table flashcards`,
                    [],
                    (tx, result) => {
                        tx.executeSql(
                            `drop table  flashcard_progress`,
                            [],
                            (tx, result) => {
                                tx.executeSql(
                                    `drop table  flashcard_category`,
                                    [],
                                    (tx, result) => {
                                        console.log(result);
                                    },
                                    (tx, err) => {
                                        console.log(err);
                                    }
                                );
                            },
                            (tx, err) => {
                                console.log(err);
                            }
                        );
                    },
                    (tx, err) => {
                        console.log(err);
                    }
                );
            },
            (tx, err) => {
                console.log(err);
            }
        );
    });
};

export const initializeTables = () => {
    dbObj.transaction((tx) => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS "flashcard_levels" ( "id"	INTEGER NOT NULL, "title_english"	TEXT, "subtitle_english"	TEXT, "title_polish"	TEXT, "subtitle_polish"	TEXT, "image"	TEXT, "remote_id"	INTEGER UNIQUE, "is_verb", PRIMARY KEY("id" AUTOINCREMENT) )',
            [],
            (tx, result) => {
                console.log(result);
            },
            (tx, err) => {
                console.log(err);
            }
        );
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS "flashcards" ( "id"	INTEGER NOT NULL, "flashcard_levels_id"	INTEGER, "remote_id"	INTEGER UNIQUE, "german"	TEXT, "german_article"	TEXT, "polish"	TEXT, "english"	TEXT, "image"	TEXT, "is_verb" INTERGER, PRIMARY KEY("id" AUTOINCREMENT), FOREIGN KEY("flashcard_levels_id") REFERENCES "flashcard_levels"("id") )'
        );
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS "flashcard_progress" ( "id"	INTEGER NOT NULL, "remote_id"	INTEGER, "remembered"	INTEGER DEFAULT 0, "level_type"	INTEGER, PRIMARY KEY("id" AUTOINCREMENT), FOREIGN KEY("remote_id") REFERENCES "flashcards"("remote_id") ON DELETE CASCADE )'
        );
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS "flashcard_category" ( "id"	INTEGER NOT NULL, "main_id"	INTEGER, "flashcard_levels_id"	INTEGER, "remote_id"	INTEGER UNIQUE, FOREIGN KEY("flashcard_levels_id") REFERENCES "flashcard_levels"("id") ON DELETE CASCADE, PRIMARY KEY("id") )'
        );
    });
};

// update value of flashcard_remembered in a flashcard
export const updateFlashcardRemembered = (
    dbObject: SQLite.WebSQLDatabase,
    cardId: number,
    levelType: number,
    rememberedValue: number
) => {
    dbObject.transaction((tx) => {
        tx.executeSql(
            `UPDATE flashcard_progress SET remembered = ? where remote_id = ? and level_type = ?`,
            [rememberedValue, cardId, levelType],
            (tx, result) => {
                console.log(result);
            },
            (tx, err) => {
                console.log(err);
            }
        );
    });
};

// query number of flashcard_remembered
export const numOfRemembered = async (
    dbObject: SQLite.WebSQLDatabase,
    rememberedValue: number,
    id: number,
    categoryId: number
): Promise<number> => {
    return new Promise((resolve, reject) => {
        dbObject.transaction((tx) => {
            tx.executeSql(
                `SELECT count(flashcard_progress.remembered) FROM flashcard_progress INNER JOIN flashcards ON flashcard_progress.remote_id = flashcards.remote_id WHERE flashcard_progress.remembered = ? AND flashcards.flashcard_levels_id = ? and flashcard_progress.level_type = ?`,
                [rememberedValue, id, categoryId],
                (tx, result) => {
                    resolve(result.rows.item(0)['count(flashcard_progress.remembered)']);
                },
                (tx, err) => {
                    reject(console.log(err));
                }
            );
        });
    });
};

// reset progress of a level
export const resetLevelProgress = (dbObject: SQLite.WebSQLDatabase) => {
    dbObject.transaction((tx) => {
        tx.executeSql(
            `UPDATE flashcard_progress SET remembered = 0`,
            [],
            (tx, result) => {
                return true;
            },
            (err) => {
                return false;
            }
        );
    });
};

export const getFlashcards = (dbObject: SQLite.WebSQLDatabase, id: number, categoryId: number, callback: Function) => {
    dbObj.transaction((tx) => {
        tx.executeSql(
            `SELECT flashcards.remote_id, flashcards.german, flashcards.german_article, flashcards.english, flashcards.polish, flashcards.image, flashcard_progress.remembered FROM flashcards INNER JOIN flashcard_progress ON flashcards.remote_id = flashcard_progress.remote_id WHERE flashcard_progress.remembered < 2 AND flashcard_levels_id = ? AND flashcard_progress.level_type = ? LIMIT 20`,
            [id, categoryId],
            (tx, results) => {
                typeof callback === 'function' && callback(results);
            }
        );
    });
};

export const getFlashcardLevels = (dbObject: SQLite.WebSQLDatabase, categoryId: number, callback: Function) => {
    dbObject.transaction((tx) => {
        tx.executeSql(
            `SELECT flashcard_levels.id, flashcard_levels.image, flashcard_levels.remote_id, flashcard_levels.subtitle_polish, flashcard_levels.title_polish FROM flashcard_levels INNER JOIN flashcard_category ON flashcard_levels.remote_id = flashcard_category.flashcard_levels_id WHERE flashcard_category.main_id = ?`,
            [categoryId],
            (tx, results) => {
                typeof callback === 'function' && callback(results);
            },
            (t, err) => {
                console.log(err);
            }
        );
    });
};

// get from server

export const updateDataFlashcards = (
    dbObject: SQLite.WebSQLDatabase,
    table: string,
    lastUpdate: string,
    dataObject: Array<any>
) => {
    dbObject.transaction((tx) => {
        dataObject.forEach((data) => {
            tx.executeSql(
                `INSERT OR IGNORE INTO flashcards(flashcard_levels_id, remote_id, german, german_article, english, polish, image) values (?, ?, ?, ?, ?, ?, ?)`,
                [data.flashcard_levels_id, data.id, data.german, data.german_article, data.english, data.polish, ''],
                (tx, result) => {
                    // prepare progress table
                    tx.executeSql(
                        `INSERT OR IGNORE INTO flashcard_progress(remote_id, level_type) values (?, ?)`,
                        [data.id, 0],
                        () => console.log('success')
                    );
                },
                (t, err) => {
                    console.log(err);
                }
            );
        });
    });
};

export const updateDataFlashcardsNew = (
    dbObject: SQLite.WebSQLDatabase,
    table: string,
    lastUpdate: string,
    dataObject: Array<any>
) => {
    dbObject.transaction((tx) => {
        dataObject.forEach((data) => {
            console.log(data);
            tx.executeSql(
                `INSERT OR IGNORE INTO flashcards(flashcard_levels_id, remote_id, german, german_article, english, polish, image, is_verb) values (?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    data.flashcard_levels_id,
                    data.id,
                    data.german,
                    data.german_article,
                    data.english,
                    data.polish,
                    data.image,
                    data.is_verb,
                ],
                (tx, result) => {
                    // prepare progress table
                    tx.executeSql(
                        `INSERT OR IGNORE INTO flashcard_progress(remote_id, level_type) values (?, ?)`,
                        [data.id, 0],
                        () => console.log('success')
                    );
                },
                (t, err) => {
                    console.log(err);
                }
            );
        });
    });
};

export const updateDataFlashcardLevels = (
    dbObject: SQLite.WebSQLDatabase,
    lastUpdate: string,
    dataObject: Array<any>
) => {
    dbObject.transaction((tx) => {
        dataObject.forEach((data) => {
            tx.executeSql(
                `INSERT OR IGNORE INTO flashcard_levels(remote_id, title_english, subtitle_english, title_polish, subtitle_polish, image, is_verb) values (?, ?, ?, ?, ?, ?, ?)`,
                [
                    data.id,
                    data.title,
                    data.subtitle_english,
                    data.title_polish,
                    data.subtitle_polish,
                    data.image,
                    data.is_verb,
                ]
            );
        });
    });
};

export const updateDataFlashcardCategory = (
    dbObject: SQLite.WebSQLDatabase,
    lastUpdate: string,
    dataObject: Array<any>
) => {
    dbObject.transaction((tx) => {
        dataObject.forEach((data) => {
            tx.executeSql(`INSERT OR IGNORE INTO flashcard_category(flashcard_levels_id, remote_id) values (?, ?, ?)`, [
                data.flashcard_levels_id,
                data.id,
            ]);
        });
    });
};

// prepares progress records when a level is run for the first time
export const prepareNewLevelProgress = (
    dbObject: SQLite.WebSQLDatabase,
    lastUpdate: string,
    levelId: number,
    categoryId: number
) => {
    dbObject.transaction((tx) => {
        const isVerb = categoryId === 3 ? 1 : 0;
        tx.executeSql(
            `SELECT flashcards.remote_id FROM flashcards INNER JOIN flashcard_levels ON flashcards.flashcard_levels_id = flashcard_levels.remote_id WHERE flashcard_levels.remote_id = ?`,
            [levelId],
            (tx, result) => {
                console.log(result.rows._array);
                result.rows._array.forEach((elem) => {
                    tx.executeSql(
                        `INSERT OR IGNORE INTO flashcard_progress(remote_id, level_type) values (?, ?)`,
                        [elem.remote_id, categoryId],
                        () => {},
                        (t, err) => {
                            console.log(err);
                        }
                    );
                });
            },
            (t, err) => {
                console.log(err);
            }
        );
    });
};

export const showFlashcards = (dbObject: SQLite.WebSQLDatabase) => {
    dbObject.transaction((tx) => {
        tx.executeSql(
            `SELECT * FROM flashcard_levels`,
            [],
            (tx, result) => {
                console.log(result.rows._array);
            },
            (t, err) => {
                console.log(err);
            }
        );
    });
};

export const showProgress = (dbObject: SQLite.WebSQLDatabase) => {
    dbObject.transaction((tx) => {
        tx.executeSql(
            `SELECT * FROM flashcard_progress`,
            [],
            (tx, result) => {
                console.log(result.rows._array);
            },
            (t, err) => {
                console.log(err);
            }
        );
    });
};

export const showTables = (dbObject: SQLite.WebSQLDatabase) => {
    dbObject.transaction((tx) => {
        tx.executeSql(
            `SELECT flashcards.german, flashcards.german_article, flashcards.english, flashcards.polish, flashcards.image, flashcard_progress.remembered, flashcard_progress.level_type FROM flashcards INNER JOIN flashcard_progress ON flashcards.remote_id = flashcard_progress.remote_id`,
            [],
            (tx, result) => {
                console.log(result.rows._array);
            },
            (t, err) => {
                console.log(err);
            }
        );
    });
};

export const logFlashcardsRemeberedJoin = (
    dbObject: SQLite.WebSQLDatabase,
    id: number,
    categoryId: number
): Promise<number> => {
    dbObject.transaction((tx) => {
        tx.executeSql(
            `SELECT * FROM flashcard_progress INNER JOIN flashcards ON flashcard_progress.remote_id = flashcards.remote_id WHERE flashcards.flashcard_levels_id = ? and flashcard_progress.level_type = ?`,
            [id, categoryId],
            (tx, result) => {
                console.log(result.rows._array);
            },
            (tx, err) => {
                console.log(err);
            }
        );
    });
};
