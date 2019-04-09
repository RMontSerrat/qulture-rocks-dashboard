export const transformDate = date => new Date(Date.parse(`${date}T00:00:00-03:00`)).toLocaleDateString();

export const makeUser = user => ({
  jobTitle: user.job_title,
  admissionDate: transformDate(user.admission_date),
  image: user.photo_url,
  name: user.name,
  email: user.email,
})
