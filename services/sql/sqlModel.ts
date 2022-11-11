import * as SQLite from 'expo-sqlite';
import { Database, SQLError, SQLResultSet, SQLTransaction } from 'expo-sqlite';

export class SqlModel {
    db: Database;
    dbName: string;

    constructor() {
        this.dbName = 'bookapp';
        this.db = SQLite.openDatabase(this.dbName);
    }

    execute(statement: string, args?: Array<any>, callback?: (tx: SQLTransaction, res: SQLResultSet) => void) {
        console.log(statement);
        this.db.transaction((tx) => {
            tx.executeSql(
                statement,
                args || [],
                (tx, res) => {
                    if (typeof callback === 'function') callback(tx, res);
                },
                (err) => this.handleError(err)
            );
        });
    }

    private handleError(err: SQLError) {
        console.log(err);
        if (err.message.includes('no such table')) {
            this.prepareTables();
        }
    }

    private prepareTables() {
        this.execute(
            `CREATE TABLE IF NOT EXISTS "flashcard_levels" ( 
            "id" INTEGER NOT NULL, 
            "title_english"	TEXT, 
            "subtitle_english" TEXT, 
            "title_polish" TEXT, 
            "subtitle_polish" TEXT, 
            "image"	TEXT, 
            "remote_id"	INTEGER UNIQUE, 
            "is_verb", 
            PRIMARY KEY("id" AUTOINCREMENT) 
        )`
        );

        this.execute(
            `CREATE TABLE IF NOT EXISTS "flashcards" ( 
            "id" INTEGER NOT NULL, 
            "flashcard_levels_id" INTEGER, 
            "remote_id"	INTEGER UNIQUE, 
            "german" TEXT, 
            "german_article" TEXT, 
            "polish" TEXT, 
            "english" TEXT, 
            "image"	TEXT, 
            PRIMARY KEY("id" AUTOINCREMENT), 
            FOREIGN KEY("flashcard_levels_id") REFERENCES "flashcard_levels"("id") 
        )`
        );

        this.execute(
            `CREATE TABLE IF NOT EXISTS "flashcard_progress" ( 
            "id" INTEGER NOT NULL, 
            "remote_id"	INTEGER, 
            "remembered" INTEGER DEFAULT 0, 
            "level_type" INTEGER, 
            PRIMARY KEY("id" AUTOINCREMENT), 
            FOREIGN KEY("remote_id") REFERENCES "flashcards"("remote_id") ON DELETE CASCADE 
        )`
        );

        this.execute(
            `CREATE TABLE IF NOT EXISTS "flashcard_category" ( 
            "id" INTEGER NOT NULL, 
            "main_id" INTEGER, 
            "flashcard_levels_id" INTEGER, 
            "remote_id"	INTEGER UNIQUE, 
            FOREIGN KEY("flashcard_levels_id") REFERENCES "flashcard_levels"("id") ON DELETE CASCADE, 
            PRIMARY KEY("id") 
        )`
        );
    }
}
