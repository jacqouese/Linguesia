import * as SQLite from 'expo-sqlite';

// update value of flashcard_remembered in a flashcard
export const updateFlashcardRemembered = (dbObject:SQLite.WebSQLDatabase, table:string, cardId:number, rememberedValue:number) => {
    dbObject.transaction((tx) => {
        tx.executeSql(`UPDATE flashcard_progress SET remembered = ? where remote_id = ?`, [rememberedValue, cardId], (tx, result) => {
            // nothing
        }, (tx, err) => {
            console.log(err)
        });
    });
}

// query number of flashcard_remembered
export const numOfRemembered = async (dbObject:SQLite.WebSQLDatabase, rememberedValue:number, id:number):Promise<number> => {
    return new Promise((resolve, reject) => {
        dbObject.transaction((tx) => {
            tx.executeSql(`SELECT count(flashcard_progress.remembered) FROM flashcard_progress INNER JOIN flashcards ON flashcard_progress.remote_id = flashcards.remote_id WHERE flashcard_progress.remembered = ? AND flashcards.flashcard_levels_id = ?`, [rememberedValue, id], (tx, result) => {
                resolve(result.rows.item(0)['count(flashcard_progress.remembered)']);
            }, (tx, err) => {
                reject(console.log(err));
            });
        });
    })
   
}

// reset progress of a level
export const resetLevelProgress = (dbObject:SQLite.WebSQLDatabase, table:string) => {
    dbObject.transaction((tx) => {
        tx.executeSql(`UPDATE flashcard_progress SET remembered = 0`, [], (tx, result) => {
            return true;
        }, (err) => {
            return false;
        });
    });
}

export const getFlashcards = (dbObject:SQLite.WebSQLDatabase, id:number, callback:Function) => {
    dbObject.transaction((tx) => {
        tx.executeSql(`SELECT flashcards.remote_id, flashcards.german, flashcards.german_article, flashcards.english, flashcards.polish, flashcard_progress.remembered FROM flashcards INNER JOIN flashcard_progress ON flashcards.remote_id = flashcard_progress.remote_id WHERE flashcard_progress.remembered < 2 AND flashcard_levels_id = ? LIMIT 20`, [id], (tx, results) => {
            typeof callback === 'function' && callback(results);
        });
    });
}

export const getFlashcardLevels = (dbObject:SQLite.WebSQLDatabase, callback:Function) => {
    dbObject.transaction((tx) => {
        tx.executeSql(`SELECT * FROM flashcard_levels`, [], (tx, results) => {
            typeof callback === 'function' && callback(results);
        });
    });
}

// get from server

export const updateDataFlashcards = (dbObject:SQLite.WebSQLDatabase, table:string, lastUpdate:string, dataObject:Array<any>) => {
    dbObject.transaction((tx) => {
       dataObject.forEach(data => {
            tx.executeSql(`INSERT OR IGNORE INTO flashcards(flashcard_levels_id, remote_id, german, german_article, english, polish, image) values (?, ?, ?, ?, ?, ?, ?)`, 
            [data.flashcard_levels_id, data.id, data.german, data.german_article, data.english, data.polish, ''],  
            (tx, result) => {
                // prepare progress table
                tx.executeSql(`INSERT OR IGNORE INTO flashcard_progress(remote_id, level_type) values (?, ?)`, [data.id, 0], () => console.log('success'))

            }, (t, err) => {
                console.log(err)
            });
       })
    });

}

export const updateDataFlashcardLevels = (dbObject:SQLite.WebSQLDatabase, lastUpdate:string, dataObject:Array<any>) => {
    dbObject.transaction((tx) => {
       dataObject.forEach(data => {
            tx.executeSql(
            `INSERT OR IGNORE INTO flashcard_levels(remote_id, title_english, subtitle_english, title_polish, subtitle_polish, image) values (?, ?, ?, ?, ?, ?)`,
            [data.id, data.title, data.subtitle_english, data.title_polish, data.subtitle_polish, data.image],
            );
       })
    });

}

export const updateDataFlashcardCategory = (dbObject:SQLite.WebSQLDatabase, lastUpdate:string, dataObject:Array<any>) => {
    dbObject.transaction((tx) => {
       dataObject.forEach(data => {
            tx.executeSql(
            `INSERT OR IGNORE INTO flashcard_category(main_id, flashcard_levels_id) values (?, ?)`,
            [data.main_id, data.flashcard_levels_id],
            );
       })
    });

}

export const showFlashcards = (dbObject:SQLite.WebSQLDatabase) => {
    dbObject.transaction((tx) => {
        tx.executeSql(`SELECT * FROM flashcard_levels`, [], (tx, result) => {
            console.log(result.rows._array)
        }, (t, err) => {
            console.log(err)
        });
     });
}

export const showTables = (dbObject:SQLite.WebSQLDatabase) => {
    dbObject.transaction((tx) => {
        tx.executeSql(
            `SELECT flashcards.german, flashcards.german_article, flashcards.english, flashcards.polish, flashcard_progress.remembered FROM flashcards INNER JOIN flashcard_progress ON flashcards.remote_id = flashcard_progress.remote_id`,
             [], (tx, result) => {
            console.log(result.rows._array)
        }, (t, err) => {
            console.log(err)
        });
     });
}