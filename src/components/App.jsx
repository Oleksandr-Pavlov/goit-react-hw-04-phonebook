import { useState, useEffect } from 'react';
import { ContactsList } from './ContactsList/ContactsList';
import { Form } from './Form/Form';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';

const LS_KEY = 'contacts_list'
const defaultContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];
const localStorageContacts = JSON.parse(window.localStorage.getItem(LS_KEY));

export const App = () => {
  const [contacts, setContacts] = useState(localStorageContacts ?? defaultContacts);
  const [filteredName, setFilteredName] = useState('')

  const onChangeFilter = e => {
    const { value } = e.currentTarget;
    setFilteredName(value)
  };

  const getFilteredContacts = () => {
    const normalizedFilteredName = filteredName.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilteredName)
    );
  };

  const handleSubmit = (name, number) => {
    const isExist = contacts.find(contact => contact.name === name);

    if (isExist) return alert(`${name} is already in contacts.`);

    setContacts(contacts => [...contacts, { id: nanoid(), name,  number }]);
  };

  const deleteContact = contactId => setContacts(contacts => contacts.filter(contact => contact.id !== contactId));

  useEffect(() => {
    window.localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts])
  

  // const componentDidMount() {
  //   const contacts = localStorage.getItem(LS_KEY)
  //   const parsedContacts = JSON.parse(contacts)

  //   parsedContacts && this.setState({contacts: parsedContacts})
  // }
  
  // const componentDidUpdate(prevState) {
  //   if (prevState.contacts !== this.state.contacts) {
  //     localStorage.setItem(LS_KEY, JSON.stringify(this.state.contacts));
  //   }
  // }

    return (
      <div>
        <h1>Phonebook</h1>
        <Form onSubmit={handleSubmit} />
        <h2>Contacts</h2>
        <Filter value={filteredName} onChange={onChangeFilter} />
        <ContactsList
          contacts={getFilteredContacts()}
          onDelete={deleteContact}
        />
      </div>
    );
  }
