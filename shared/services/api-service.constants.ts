

//We currently only support OB-GYN
const availableServiceTags = 'OB-GYN'

/**
 * Client components only need the getServicesURL to fetch,
 * but Server components need to also have the domain prefixed
 */
export const getServicesURL = `/api/services?serviceTags=${availableServiceTags}`;

export const getDoctorsURL = (tags?: string) => {
  let url = `/api/doctors`;

  if (tags) {
    url = `${url}?serviceTags=${tags}`;
  }
  
  return url;
}


export const getLocationsURL = (name?: string) => {
  let url = `/api/locations`;

  if (name) {
    url = `${url}?name=${name}`;
  }

  return url;
}