import Culqi from '../src/index';
import vars from '../src/vars';

describe('Culqi', () => {
  it('should throw error if privateKey is not set', () => {
    try {
      // tslint:disable-next-line:no-unused-expression
      new Culqi();
    } catch (e) {
      expect(e).toMatchSnapshot();
    }
  });

  it('should set private key', () => {
    // tslint:disable-next-line:no-unused-expression
    new Culqi({
      privateKey: 'private-key-test',
    });
    expect(vars.privateKey).toBe('private-key-test');
  });

  it('should throw error if pciCompliant is true but no public key was provided', () => {
    try {
      // tslint:disable-next-line:no-unused-expression
      new Culqi({
        privateKey: 'abc',
        pciCompliant: true,
      });
    } catch (e) {
      expect(e).toMatchSnapshot();
    }
  });

  it('should throw error if publicKey is provided but pciCompliant is not true', () => {
    try {
      // tslint:disable-next-line:no-unused-expression
      new Culqi({
        privateKey: 'abc',
        publicKey: 'abc',
      });
    } catch (e) {
      expect(e).toMatchSnapshot();
    }
  });

  it('should set privateKey and publicKey', () => {
    // tslint:disable-next-line:no-unused-expression
    new Culqi({
      privateKey: 'abc',
      publicKey: 'bcd',
      pciCompliant: true,
    });
    expect(vars.privateKey).toBe('abc');
    expect(vars.publicKey).toBe('bcd');
  });

  it('should have tokens property', () => {
    const culqi = new Culqi({
      privateKey: 'abc',
      publicKey: 'bcd',
      pciCompliant: true,
    });
    expect(culqi.tokens).toMatchSnapshot();
  });

  it('should have charges property', () => {
    const culqi = new Culqi({
      privateKey: 'abc',
      publicKey: 'bcd',
      pciCompliant: true,
    });
    expect(culqi.charges).toMatchSnapshot();
  });

  it('should have refunds property', () => {
    const culqi = new Culqi({
      privateKey: 'abc',
      publicKey: 'bcd',
      pciCompliant: true,
    });
    expect(culqi.refunds).toMatchSnapshot();
  });
});
