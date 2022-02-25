import {Token, tokens} from '../../src/tokens';
import {generateCreateTokenRequest} from './card';

export async function getToken(): Promise<Token> {
  try {
    return await tokens.createToken(generateCreateTokenRequest());
  } catch (e) {
    console.log(e);
    throw new Error('Could not create token');
  }
}
