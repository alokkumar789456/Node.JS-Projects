const request = require('supertest');
const app = require('../app.js'); // Assuming this is where your Express app is defined
const Employee = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Mocking the Employee model
jest.mock('../models/userModel.js');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('POST /register', () => {
  let token;

  beforeAll(() => {
    // Generate a mock JWT token for authorization
    token = jwt.sign(
      { empId: 1, admin: true }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );
  });

  it('should return 401 if no token is provided', async () => {
    const response = await request(app).post('/register').send({});

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Access denied. No token provided.');
  });

  it('should return 403 if user is not an admin', async () => {
    const nonAdminToken = jwt.sign({ empId: 1, admin: false }, process.env.JWT_SECRET);
    
    const response = await request(app)
      .post('/register')
      .set('Cookie', `authToken=${nonAdminToken}`)
      .send({
        empId: 3,
        email: 'admin@gmail.com',
        role: 'admin',
        dept: 'HR',
        branch: 'New York',
        admin: false
      });

    expect(response.status).toBe(403);
    expect(response.body.error).toBe('Access denied. Admin privileges required.');
  });

  it('should return 400 if email already exists', async () => {
    const mockEmployee = { email: 'admin@example.com' };
    Employee.findOne.mockResolvedValue(mockEmployee); // Mock duplicate email

    const response = await request(app)
      .post('/register')
      .set('Cookie', `authToken=${token}`)
      .send({
        empId: 2,
        email: 'admin@example.com',
        role: 'Employee',
        dept: 'HR',
        branch: 'New York',
        admin: false
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Email already exists. Try another one!');
  });

  it('should register successfully', async () => {
    const mockEmployee = { empId: 2, email: 'newuser@example.com' };
    Employee.findOne.mockResolvedValue(null); // Mock email not found
    Employee.create.mockResolvedValue(mockEmployee); // Mock successful creation

    const response = await request(app)
      .post('/register')
      .set('Cookie', `authToken=${token}`)
      .send({
        empId: 2,
        email: 'newuser@example.com',
        role: 'Employee',
        dept: 'HR',
        branch: 'New York',
        admin: false
      });

    expect(response.status).toBe(201);
    expect(response.body.email).toBe('newuser@example.com');
    expect(response.body.generatedPassword).toBeDefined();
  });
});

describe('POST /login', () => {
  it("should return 404 if the email doesn't exist", async () => {
    Employee.findOne.mockResolvedValue(null); // Mock non-existing email

    const response = await request(app)
      .post('/login')
      .send({
        email: 'nonexistent@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(404);
    expect(response.text).toBe("You don't have an account with this email!");
  });

  it('should return 401 for incorrect password', async () => {
    const mockEmployee = {
      empId: 1,
      email: 'admin@example.com',
      password: bcrypt.hashSync('correctpassword', 10),
      admin: true
    };
    Employee.findOne.mockResolvedValue(mockEmployee); // Mock employee data

    const response = await request(app)
      .post('/login')
      .send({
        email: 'admin@example.com',
        password: 'incorrectpassword',
      });

    expect(response.status).toBe(401);
    expect(response.text).toBe('Incorrect password. Please try again.');
  });

  it('should login successfully', async () => {
    const mockEmployee = {
      empId: 1,
      email: 'admin@example.com',
      password: bcrypt.hashSync('correctpassword', 10),
      admin: true
    };
    Employee.findOne.mockResolvedValue(mockEmployee); // Mock employee data
    jwt.sign.mockReturnValue('mockedJWTToken'); // Mock JWT token generation

    const response = await request(app)
      .post('/login')
      .send({
        email: 'admin@example.com',
        password: 'correctpassword',
      });

    expect(response.status).toBe(200);
    expect(response.text).toContain('Login successful! Welcome, Employee ID: 1');
    expect(response.headers['set-cookie']).toBeDefined();
  });

  it('should return 500 if an error occurs', async () => {
    Employee.findOne.mockRejectedValue(new Error('Database error')); // Simulate DB error

    const response = await request(app)
      .post('/login')
      .send({
        email: 'admin@example.com',
        password: 'correctpassword',
      });

    expect(response.status).toBe(500);
    expect(response.text).toBe('An error occurred: Database error');
  });
});
