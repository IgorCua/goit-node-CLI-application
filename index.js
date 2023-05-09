import { Command } from 'commander';
import * as contacts from './db/contacts.js';
import { 
    listContacts, 
    getContactById, 
    removeContact, 
    addContact 
} from './db/contacts.js';
import { get } from 'http';
// const fs = require('fs').promises;
// const contacts = require('./db/contacts');
const program = new Command();

// console.log('started');
// console.log(__dirname);
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// console.log('argv: ', argv)
// contacts.listContacts();
// contacts.getContactById(rsKkOQUi80UsgVPCcLZZW);
async function test(){
    const getById = await contacts.getContactById('rsKkOQUi80UsgVPCcLZZW');
    console.log('test', getById);
}

// test();

const invokeAction = async ({action, id, name, email, phone}) => {
    switch(action){
        case 'list':
            const getList = await listContacts();
            console.log('getContacts');
            console.log('listContacts length: ', getList.length);
            break;
        case 'get':
            const getByid = await getContactById(id);
            console.log('getById', getByid);
            break;
        case 'add':
            const contact = await addContact(name, email, phone);
            console.log('addContact', contact);
            break;
        case 'remove': 
            const remove = await removeContact(id);
            console.log('removeContact: ', remove);
            break;
        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(argv);
// console.log(contacts.getContactById('rsKkOQUi80UsgVPCcLZZW'));