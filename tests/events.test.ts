import {events} from '../src/events';
import vars from '../src/vars';
import {httpMockFactory} from './request/__mocks__';
import {RequestOptions} from 'https';

describe('events', () => {
  let publicKey: string;
  let privateKey: string;

  // let eventId: string;

  beforeEach(() => {
    privateKey = process.env.CULQI_PRIVATE_KEY || '';
    publicKey = process.env.CULQI_PUBLIC_KEY || '';
    vars.privateKey = privateKey;
    vars.publicKey = publicKey;
    jest.clearAllMocks();
  });

  describe('getEvents', () => {
    it('should change path', () => {
      const mockedHttps = httpMockFactory();
      events.getEvents(undefined, {
        _httpProvider: mockedHttps,
      });
      const c = mockedHttps.request.mock.calls[0][0] as RequestOptions;
      expect(c.path).toMatchSnapshot();
    });

    it('should get events', async () => {
      const resp = await events.getEvents();
      expect(resp.data.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('getEvent', () => {
    it('should change path', () => {
      const mockedHttps = httpMockFactory();
      events.getEvent(
        {
          id: 'sample-event-id',
        },
        {
          _httpProvider: mockedHttps,
        }
      );
      const c = mockedHttps.request.mock.calls[0][0] as RequestOptions;
      expect(c.path).toMatch(
        `${vars.baseEndpoint.basePath}${vars.basePaths.events}/sample-event-id`
      );
    });

    /*it('should get event', async () => {
      const resp = await events.getEvent({
        id: eventId,
      });
      expect(resp.object).toMatchSnapshot();
      expect(resp.type).toMatchSnapshot();
    });*/
  });
});
