import axios from 'axios';
import fetch, { getrecruiterToken, recruitersignUp, storeToken } from './loginHandler';

// Mock axios
jest.mock('axios');

describe('fetch function', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear any mocks before each test
  });

  test('fetch should resolve with response data on successful request', async () => {
    const mockResponse = { data: { success: true } };
    axios.mockResolvedValueOnce(mockResponse);

    const options = {
      method: 'GET',
      url: '/test',
      headers: { Authorization: 'Bearer token' },
      params: { query: 'value' },
      body: { key: 'value' },
    };

    const result = await fetch(options);

    expect(axios).toHaveBeenCalledWith({
      url: 'http://127.0.0.1:5001/test',
      method: 'GET',
      headers: { Authorization: 'Bearer token' },
      params: { query: 'value' },
      data: { key: 'value' },
    });

    expect(result).toEqual({ success: true });
  });
});

describe('recruitersignUp function', () => {
  test('should call fetch with correct options for signup', async () => {
    const params = { username: 'test', password: 'password', fullName: 'Test User' };
    const mockResponse = { success: true };
    axios.mockResolvedValueOnce({ data: mockResponse });

    const result = await recruitersignUp(params);

    expect(axios).toHaveBeenCalledWith({
      url: 'http://127.0.0.1:5001/recruiter/signup',
      method: 'POST',
      data: params,
    });

    expect(result).toEqual(mockResponse);
  });
});

describe('storeToken function', () => {
    beforeEach(() => {
      // Mock localStorage
      const localStorageMock = (() => {
        let store = {};
        return {
          getItem: jest.fn((key) => store[key] || null),
          setItem: jest.fn((key, value) => {
            store[key] = value.toString();
          }),
          removeItem: jest.fn((key) => {
            delete store[key];
          }),
          clear: jest.fn(() => {
            store = {};
          }),
        };
      })();
  
      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
      });
    });
  
    test('should store token and userId in localStorage', () => {
      const obj = {
        token: '12345',
        profile: { username: 'testUser' },
      };
  
      storeToken(obj);
  
      expect(localStorage.setItem).toHaveBeenCalledWith('token', '12345');
      expect(localStorage.setItem).toHaveBeenCalledWith('userId', 'testUser');
    });
  });
  
  jest.mock('axios');

  describe('fetch function error handling', () => {
    beforeEach(() => {
      jest.clearAllMocks();
  
      const localStorageMock = {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      };
  
      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
      });
  
      delete window.location;
      window.location = { href: '' };
    });
  
    test('should handle 401 error by clearing localStorage and redirecting to login', async () => {
      axios.mockRejectedValueOnce({
        status: 401,
        response: {
          status: 401,
        },
      });
  
      const options = {
        url: '/test-url',
        method: 'GET',
      };
  
      try {
        await fetch(options);
      } catch (e) {
      }
  
      expect(localStorage.removeItem).toHaveBeenCalledWith('token');
      expect(window.location.href).toBe('/');
    });
  
    test('should reject with the error for non-401 responses', async () => {
      const errorResponse = {
        status: 500,
        response: {
          status: 500,
          message: 'Internal Server Error',
        },
      };
  
      axios.mockRejectedValueOnce(errorResponse);
  
      const options = {
        url: '/test-url',
        method: 'GET',
      };
  
      await expect(fetch(options)).rejects.toEqual(errorResponse);
  
      expect(localStorage.removeItem).not.toHaveBeenCalled();
      expect(window.location.href).toBe('');
    });
  });