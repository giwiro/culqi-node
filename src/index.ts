import vars from './vars';
import {tokens} from './tokens';
import {charges} from './charges';
import {refunds} from './refunds';
import {customers} from './customers';
import {cards} from './cards';
import {plans} from './plans';
import {subscriptions} from './subscriptions';
import {orders} from './orders';
import {events} from './events';

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
  public cards = cards;
  public plans = plans;
  public subscriptions = subscriptions;
  public orders = orders;
  public events = events;

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
