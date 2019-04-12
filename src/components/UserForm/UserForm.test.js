import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import UserForm from './UserForm';

afterEach(cleanup);
describe('<Form />', () => {
  const params = {
    name: 'romulo',
    jobTitle: 'dev',
    email: 'romulomontserrat@gmail.com',
    admissionDate: '24/10/1994',
    image: '',
  }
  it('should render with all inputs', () => {
    const { getByTestId } = render(<UserForm {...params} />);
    const inputName = getByTestId('name').querySelector('input');
    const inputJobTitle = getByTestId('jobTitle').querySelector('input');
    const inputEmail = getByTestId('email').querySelector('input');
    const inputAdmissionDate = getByTestId('admissionDate').querySelector('input');
    expect(inputName.value).toBe(params.name);
    expect(inputJobTitle.value).toBe(params.jobTitle);
    expect(inputEmail.value).toBe(params.email);
    expect(inputAdmissionDate.value).toBe(params.admissionDate);
  });

  it('should call onSubmit', () => {
    const onSubmit = jest.fn();
    const { getByTestId } = render(<UserForm {...params} onSubmit={onSubmit} />);
    const submitButton = getByTestId('submitButton');
    const inputName = getByTestId('name').querySelector('input');
    fireEvent.change(inputName, { target: { value: 'ze' }});
    fireEvent.click(submitButton);
    expect(onSubmit).toBeCalled();
    expect(onSubmit).toBeCalledWith({
      name: 'ze',
      job_title: 'dev',
      email: 'romulomontserrat@gmail.com',
      admission_date: '1994-10-24',
      photo_url: '',
    });
  });
});
