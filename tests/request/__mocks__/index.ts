const httpMockFactory = () => {
  return {
    request: jest.fn((_) => ({
      write: jest.fn(),
      end: jest.fn(),
    })),
  };
};

export {httpMockFactory};
