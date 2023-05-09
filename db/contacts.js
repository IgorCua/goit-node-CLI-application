import { writeFile, readFile } from 'fs/promises';
import { nanoid } from 'nanoid';
import path from 'path';
import { fileURLToPath } from 'url';

const __filePath = fileURLToPath(import.meta.url);
const contactsPath = path.join(__filePath, '..', 'contacts.json');


// console.log('contacts')
// console.log('contactspath', contactsPath)
// console.log(path.join(__dirname, 'contacts.json'));
// TODO: document each function
async function listContacts() {
  return readFile(contactsPath)
    .then(data => {
        return JSON.parse(data.toString());
    })
    .catch(err => console.log(err.message));
}

async function getContactById(contactId) {
    const contactsArr = await listContacts();
    return contactsArr.find(elem => elem.id === contactId);
}

function removeContact(contactId) {
    console.log('removeContact');
    
}

async function addContact(name, email, phone) {
    let contactsArr = await listContacts();

    console.log('addContact');

    let newContact = {
      id: nanoid(),
      name: name,
      email: email,
      phone: phone
    }

    contactsArr.push(newContact);

    await writeFile(contactsPath, JSON.stringify(contactsArr, null, 2));

    return newContact;
}

export {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    contactsPath
}