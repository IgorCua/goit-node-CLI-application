import { Command } from 'commander';
import { 
    listContacts, 
    getContactById, 
    removeContact, 
    addContact 
} from './db/contacts.js';
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({action, id, name, email, phone}) => {
    switch(action){
        case 'list':
            const getList = await listContacts();
            console.table(getList);
            break;
        case 'get':
            const getByid = await getContactById(id);
            console.log('get ', getByid);
            break;
        case 'add':
            const contact = await addContact(name, email, phone);
            const addGetList = await listContacts();
            console.log('list length after addition', addGetList.length)
            console.log('addContact', contact);
            break;
        case 'remove': 
            const remove = await removeContact(id);
            const removeGetList = await listContacts();
            console.log('list length after removal ', removeGetList.length)
            console.log('removeContact: ', remove);
            break;
        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(argv);