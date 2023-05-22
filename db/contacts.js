import { writeFile, readFile } from 'fs/promises';
import { nanoid } from 'nanoid';
import path from 'path';
import { fileURLToPath } from 'url';

const __filePath = fileURLToPath(import.meta.url);
const contactsPath = path.join(__filePath, '..', 'contacts.json');


async function listContacts() {
  return await readFile(contactsPath)
    .then(data => {
        return JSON.parse(data.toString());
    })
    .catch(err => console.log(err.message));
}

async function getContactById(contactId) {
    try {
        const contactsArr = await listContacts();
        const findContact = contactsArr.find(elem => elem.id === contactId);

        return findContact;
    } catch (error) {
        console.log(error);
    }
}

async function removeContact(contactId) {
    try{
        const contactsArr = await listContacts();
        const getContactIndex = contactsArr.findIndex(elem => elem.id === contactId);
        const deletedContact = contactsArr.splice(getContactIndex, 1);
    
        await writeFile(contactsPath, JSON.stringify(contactsArr, null, 2));
    
        return deletedContact;
    } catch (error) {
        console.log(error);
    }
}

async function addContact(name, email, phone) {
    try {
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
    } catch (error) {
        console.log(error);
    }
}

export {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    contactsPath
}
