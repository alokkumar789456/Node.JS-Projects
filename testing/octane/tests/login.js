const request = require('supertest');
const app = require('../app.js'); 
const Employee = require('../models/userModel.js'); // Mock the Employee model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('../models/userModel.js'); 

describe('POST /login', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks after each test
  });

  it('should return 200 and a token for valid credentials', async () => {
    // Mock employee data
    const mockEmployee = {
      empId: 1,
      email: 'admin@gmail.com',
      password: bcrypt.hashSync('74kt46qs', 10), // Hashed password
      admin: true,
    };

    Employee.findOne.mockResolvedValue(mockEmployee); // Mock DB query

    const response = await request(app)
      .post('/login')
      .send({
        email: 'admin@gmail.com',
        password: '74kt46qs',
      });

    expect(response.status).toBe(200);
    expect(response.text).toContain('Login successful! Welcome, Employee ID: 1');
    expect(response.headers['set-cookie']).toBeDefined();
  });

  it("should return 404 if the email doesn't exist", async () => {
    Employee.findOne.mockResolvedValue(null); // Mock DB query returning no employee

    const response = await request(app)
      .post('/login')
      .send({
        email: 'nonexistent@gmail.com',
        password: 'password123',
      });

    expect(response.status).toBe(404);
    expect(response.text).toBe("You don't have an account with this email!");
  });

  it('should return 401 for an incorrect password', async () => {
    // Mock employee data with correct email but incorrect password
    const mockEmployee = {
      empId: 1,
      email: 'admin@gmail.com',
      password: bcrypt.hashSync('74kt46qs', 10), // Hashed password
      admin: true,
    };

    Employee.findOne.mockResolvedValue(mockEmployee); // Mock DB query

    const response = await request(app)
      .post('/login')
      .send({
        email: 'admin@gmail.com',
        password: 'wrongpassword',
      });

    expect(response.status).toBe(401);
    expect(response.text).toBe('Incorrect password. Please try again.');
  });

  it('should return 500 if an error occurs', async () => {
    // Simulate an internal server error
    Employee.findOne.mockRejectedValue(new Error('Database connection error'));

    const response = await request(app)
      .post('/login')
      .send({
        email: 'admin@gmail.com',
        password: '74kt46qs',
      });

    expect(response.status).toBe(500);
    expect(response.text).toBe('An error occurred: Database connection error');
  });
});
