import { SqlModel } from './sqlModel';

export default class SqlActions {
    db: SqlModel;

    constructor() {
        this.db = new SqlModel();
    }
}
