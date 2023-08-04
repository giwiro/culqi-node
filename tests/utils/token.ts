import {Token, tokens} from '../../src/tokens';
import {generateCreateTokenRequest} from './card';
import {sleep} from './time';

export async function getToken(): Promise<Token> {
  try {
    await sleep(1000);
    return await tokens.createToken(generateCreateTokenRequest());
  } catch (e) {
    console.log(e);
    throw new Error('Could not create token');
  }
}
