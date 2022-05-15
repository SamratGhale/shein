import Dexie from 'dexie';
export const db = new Dexie('shein');
db.version(1).stores({
    cart: '++id, item_id,item, quantity',
});