import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

const Form = ({
    name,
    jobTitle,
    email,
    admissionDate,
    id,
    image,
    onSubmit,
  }) => {

  const [fields, changeFields] = useState({
    name,
    jobTitle,
    email,
    admissionDate,
    image,
  });

  const translate = field => {
    switch(field) {
      case 'name':
        return 'Nome';
      case 'email':
        return 'E-mail';
      case 'jobTitle':
        return 'Cargo';
      case 'admissionDate':
        return 'Data de admissão';
      default:
        return field;
    }
  }

  const handleChange = e => {
    const { target: { name, value }} = e;
    changeFields({
      ...fields,
      [name]: value,
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({
        ...fields,
        job_title: fields.jobTitle,
        admission_date: fields.admissionDate,
        photo_url: fields.image,
        id,
      })
    }
  }  
  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(fields).map(field => field === 'image' ? (
        <Avatar alt={fields.name} src={fields[field]} />
      ): (
        <FormControl>
          <InputLabel htmlFor={field}>{translate(field)}</InputLabel>
          <Input name={field} id={field} value={fields[field]} onChange={handleChange} />
        </FormControl>
      ))}
      <input type="submit" value="Submit" />
    </form>
  )
}

export default Form;