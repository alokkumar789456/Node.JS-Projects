const request = require('supertest');
const app = require('../app.js'); 
const Employee = require('../models/userModel.js'); 
const bcrypt = require('bcrypt');
const sequelize = require('../config/DB.js'); // Sequelize instance

jest.mock('../models/userModel.js'); 

describe('POST /login', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks after each test
  });

  afterAll(async () => {
    await sequelize.close(); // Close database connection
    jest.restoreAllMocks(); // Restore all mocks
  });

  it('should return 200 and a token for valid credentials', async () => {
    const mockEmployee = {
      empId: 3,
      email: 'admin@gmail.com',
      password: bcrypt.hashSync('8pimtqla', 10),
      admin: true,
    };

    Employee.findOne.mockResolvedValue(mockEmployee); 

    const response = await request(app)
      .post('/login')
      .send({
        email: 'admin@gmail.com',
        password: '8pimtqla',
      });

    expect(response.status).toBe(200);
    expect(response.text).toContain('Login successful! Welcome, Employee ID: 3');
    expect(response.headers['set-cookie']).toBeDefined();
  });

  it("should return 404 if the email doesn't exist", async () => {
    Employee.findOne.mockResolvedValue(null);

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
    const mockEmployee = {
      empId: 3,
      email: 'admin@gmail.com',
      password: bcrypt.hashSync('8pimtqla', 10),
      admin: true,
    };

    Employee.findOne.mockResolvedValue(mockEmployee); 

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
})