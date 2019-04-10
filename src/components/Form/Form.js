import React, { useState } from 'react';
import { withRouter } from "react-router";
import styled from 'styled-components';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Loading from '../Loading/Loading';
import ImageUpload from '../ImageUpload/ImageUpload';

const ContainerInputs = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  > div {
    padding-bottom: 20px;
    width: 100%;
  }
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 0;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 40px;
  > button {
    margin: 0 5px;
    width: 85px;
    height: 36px;
  }
`

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
        admission_date: new Date(admissionDate).toJSON().split('T')[0],
        photo_url: null,
      })
    }
  }

  const handleChangeImage = ({ preview }) => {
    changeFields({
      ...fields,
      image: preview,
    })
  }

  const { image: imageUrl, ...restFields } = fields;
  return (
    <StyledForm onSubmit={handleSubmit}>
      <ImageUpload onChange={handleChangeImage} url={imageUrl} />
      <ContainerInputs>
        {Object.keys(restFields).map(field => (
          <FormControl key={field}>
            <InputLabel htmlFor={field}>{translate(field)}</InputLabel>
            <Input
              name={field}
              id={field}
              value={restFields[field]}
              onChange={handleChange}
            />
          </FormControl>
        ))}
        <ButtonContainer>
          <Button variant="contained" type="submit" color="primary">
            {loading ? <Loading color="white" size="small" /> : 'Enviar' }
          </Button>
          <Button variant="contained" onClick={() => history.push('/')}>
            Voltar
          </Button>
        </ButtonContainer>
      </ContainerInputs>
    </StyledForm>
  )
}

export default withRouter(Form);