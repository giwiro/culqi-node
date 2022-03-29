import {CreateTokenRequest} from '../../src/tokens';

const visa: Partial<CreateTokenRequest> = {
  card_number: '4111111111111111',
  cvv: '123',
  expiration_month: '09',
};

const mastercard: Partial<CreateTokenRequest> = {
  card_number: '5111111111111118',
  cvv: '039',
  expiration_month: '06',
};

const american: Partial<CreateTokenRequest> = {
  card_number: '371212121212122',
  cvv: '2841',
  expiration_month: '11',
};

const diners: Partial<CreateTokenRequest> = {
  card_number: '36001212121210',
  cvv: '964',
  expiration_month: '04',
};

const cards = [mastercard, american, diners];

export function generateCreateTokenRequest(): CreateTokenRequest {
  const email = `richard-${Date.now()}-${Math.floor(
    Math.random() * 100000
  )}@piedpiper.com`;

  const cardInfo =
    cards[Math.floor(Math.random() * cards.length) % cards.length];

  // tslint:disable-next-line:no-object-literal-type-assertion
  return {
    ...cardInfo,
    expiration_year: '2025',
    email,
  } as CreateTokenRequest;
}
