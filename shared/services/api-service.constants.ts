import { ServiceClass } from "../classes/service";

//We currently only support OB-GYN
const availableServiceTags = 'OB-GYN'

/**
 * Client components only need the getServicesURL to fetch
 * but Server components need to also have the domain prefixed
 */
export const getServicesURL = `/api/services?serviceTags=${availableServiceTags}`;