import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const ThumbsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
`;

const thumb = {
  display: 'inline-flex',
  borderRadius: 50,
  marginBottom: 8,
  width: 100,
  height: 100,
};

const img = {
  display: 'block',
  width: '100%',
  borderRadius: 50,
  height: '100%'
};


const ImageUpload = ({ url, onChange }) => {
  const [file, setFile] = useState({
    preview: url,
  });

  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFile(Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0])
      }));
    }
  });
  
  const thumbs = (
    <div style={thumb} key={file.name}>
      <img
        src={file.preview}
        style={img}
      />
    </div>
  );

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    URL.revokeObjectURL(file.preview);
    if (onChange) {
      onChange(file);
    }
  }, [file]);

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <ThumbsContainer className="dropzone">
        {thumbs}
        <Button variant="contained">
          {file.preview ? 'Alterar foto' : 'Adicionar foto'}
        </Button>
      </ThumbsContainer>
    </div>
  );
}

export default ImageUpload;