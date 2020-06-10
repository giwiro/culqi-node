import vars from './vars';
import {tokens} from './tokens';
import {charges} from './charges';
import {refunds} from './refunds';
import {customers} from './customers';

type CulqiOptions = {
  privateKey?: string;
  pciCompliant?: boolean;
  publicKey?: string;
};

export = class Culqi {
  public tokens = tokens;
  public charges = charges;
  public refunds = refunds;
  public customers = customers;

  constructor(options: CulqiOptions = {}) {
    if (!options.privateKey) throw new Error("Provide 'privateKey' property");
    if (options.pciCompliant && !options.publicKey)
      throw new Error("Provide 'publicKey' property");
    if (!options.pciCompliant && options.publicKey)
      throw new Error(
        "Provide 'pciCompliant' options as true. " +
          'It means you acknowledge that you are PCI-compliant in order to execute certain operations.'
      );
    vars.privateKey = options.privateKey;
    if (options.publicKey) vars.publicKey = options.publicKey;
  }
};
