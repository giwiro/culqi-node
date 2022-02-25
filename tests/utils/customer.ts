import {Customer, customers} from '../../src/customers';

export async function getCustomer(): Promise<Customer> {
  const uniqueEmail =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15) +
    '@domain.com';

  try {
    return await customers.createCustomer({
      first_name: 'Richard',
      last_name: 'Hendricks',
      email: uniqueEmail,
      address: 'San Francisco Bay Area',
      address_city: 'Palo Alto',
      country_code: 'US',
      phone_number: '6505434800',
    });
  } catch (e) {
    console.log(e);
    throw new Error('Could not create customer');
  }
}
