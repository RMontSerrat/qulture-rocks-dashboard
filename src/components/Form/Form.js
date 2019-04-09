import React, { useState } from 'react';
import { withRouter } from "react-router";
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Loading from '../Loading/Loading';
import ImageUpload from '../ImageUpload/ImageUpload';

const Form = ({
    name,
    jobTitle,
    email,
    admissionDate,
    image,
    onSubmit,
    loading,
    history,
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
      const { jobTitle, admissionDate, image, ...restFields } = fields;
      onSubmit({
        ...restFields,
        job_title: jobTitle,
        admission_date: admissionDate,
        photo_url: image,
      })
    }
  }

  const handleChangeImage = ({ preview }) => {
    changeFields({
      ...fields,
      image: preview,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(fields).map(field => field === 'image' ? (
        <ImageUpload onChange={handleChangeImage} url={fields[field]} />
      ): (
        <FormControl key={field}>
          <InputLabel htmlFor={field}>{translate(field)}</InputLabel>
          <Input name={field} id={field} value={fields[field]} onChange={handleChange} />
        </FormControl>
      ))}
      <Button variant="contained" type="submit" color="primary">
        {loading ? <Loading /> : 'Enviar' }
      </Button>
      <Button variant="contained" onClick={() => history.push('/')}>
        Voltar
      </Button>
    </form>
  )
}

export default withRouter(Form);