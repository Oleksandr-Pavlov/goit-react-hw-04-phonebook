import { useState } from 'react';
import { nanoid } from 'nanoid';
import css from '../Form/Form.module.css';

export const Form = ({onSubmit}) => {
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  const contactsId = nanoid();

  const handleChange = e => {
    e.preventDefault();
    
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value)
        break

      case 'number':
        setNumber(value)
        break;

      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const { name, number } = e.target.elements;
    onSubmit(name.value, number.value);

    setName('')
    setNumber('')
  };

    return (
      <form onSubmit={handleSubmit} className={css.form}>
        <label htmlFor={contactsId}>
          <p>Name</p>
          <input
            id={contactsId}
            onChange={handleChange}
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label htmlFor={contactsId}>
          <p>Number</p>
          <input
            id={contactsId}
            onChange={handleChange}
            type="tel"
            name="number"
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button type="submit">Add contact</button>
      </form>
    );
  }
